import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampusSession, authMessage } from '../../account/campus-session';
import { Pagination, PageWindow } from '../../../shared/pagination/pagination.component';
import { RegisterStudent, StudentRegister } from '../student-register';

function monthStart(){
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit'}).formatToParts(new Date());
  return parts.find(p=>p.type==='year')!.value+'-'+parts.find(p=>p.type==='month')!.value+'-01';
}
@Component({selector:'campus-attendance-student-attendance',imports:[FormsModule,Pagination],templateUrl:'./student-attendance.component.html',styleUrl:'./student-attendance.component.css'})
export class AttendanceStudentAttendancePage {
  readonly session=inject(CampusSession);
  readonly data=signal<StudentRegister|null>(null);
  readonly loading=signal(true);
  readonly busy=signal(false);
  readonly error=signal('');
  readonly saveError=signal('');
  readonly notice=signal('');
  month=monthStart(); query=''; programme=''; paging=new PageWindow(1,10);
  selected?:{student:RegisterStudent;day:string};
  code='';
  get admin(){return this.session.user()?.role==='Owner / Admin';}
  get current(){return this.month.slice(0,7)===(this.data()?.today || monthStart()).slice(0,7);}
  get title(){return new Date(this.month+'T12:00:00').toLocaleDateString('en-GB',{month:'long',year:'numeric'});}
  readonly days=computed(()=>{
    const data=this.data();
    if(!data)return [];
    const date=new Date(data.month+'T12:00:00');
    const n=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    return Array.from({length:n},(_,i)=>{
      const day=data.month.slice(0,8)+String(i+1).padStart(2,'0');
      const w=new Date(day+'T12:00:00').getDay();
      return {n:i+1,day,label:'SMTWTFS'[w],weekend:w===0||w===6,today:day===data.today,future:day>data.today,end:w===0};
    });
  });
  readonly programmes=computed(()=>[...new Set(this.data()?.students.map(s=>s.programme))].sort());
  readonly register=computed(()=>{
    const data=this.data();
    if(!data)return [];
    const codes=new Map(data.codes.map(c=>[c.code,c]));
    const lookup=new Map(data.marks.map(m=>[m.studentId+'/'+m.day,m.code]));
    return data.students.map((s,index)=>{
      const marks=this.days().map(d=>codes.get(lookup.get(s.key+'/'+d.day) || ''));
      const present=marks.reduce((sum,c)=>sum+(c?.credit || 0),0);
      return {...s,index,initials:s.name.trim().split(/\s+/).slice(0,2).map(n=>n[0]).join(''),marks,
        present:Math.round(present*100)/100,absent:marks.filter(c=>c?.category==='Absence').length};
    });
  });
  get rows(){
    const q=this.query.trim().toLowerCase();
    return this.register().filter(r=>(!this.programme||r.programme===this.programme)&&[r.name,r.id,r.programme].join(' ').toLowerCase().includes(q));
  }
  get stats(){
    const rows=this.rows, today=this.data()?.today || '';
    const counted=rows.flatMap(r=>r.marks).filter(c=>c && c.category!=='Non-working').length;
    const credited=rows.reduce((n,r)=>n+r.present,0);
    const index=this.days().findIndex(d=>d.today);
    const eligible=rows.filter(r=>r.admitted<=today);
    return [[rows.length,'Total students'],[counted?Math.round(100*credited/counted)+'%':'—','Attendance'],
      [rows.reduce((n,r)=>n+r.absent,0),'Absent (month)'],[rows.reduce((n,r)=>n+r.marks.filter(c=>c?.category==='Leave').length,0),'On leave (month)'],
      [index<0?'—':eligible.filter(r=>(r.marks[index]?.credit || 0)>0).length,'Present (today)'],
      [index<0?'—':eligible.filter(r=>!r.marks[index]).length,'Pending (today)']];
  }
  ngOnInit(){void this.load();}
  async load(){
    this.loading.set(true);this.error.set('');
    try{this.data.set(await this.session.authenticated<StudentRegister>('attendance/students?month='+this.month,'GET'));}
    catch(e){this.data.set(null);this.error.set(authMessage(e));}finally{this.loading.set(false);}
  }
  move(delta:number){
    if(this.loading() || this.busy() || (delta>0 && this.current))return;
    const date=new Date(this.month+'T12:00:00');date.setMonth(date.getMonth()+delta);
    this.month=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-01';
    this.notice.set('');this.programme='';this.paging.page=1;void this.load();
  }
  edit(dialog:HTMLDialogElement,student:RegisterStudent,day:string,code:string){
    this.selected={student,day};this.code=code;this.saveError.set('');dialog.showModal();
  }
  confirmLock(dialog:HTMLDialogElement){this.selected=undefined;this.saveError.set('');dialog.showModal();}
  async save(dialog:HTMLDialogElement){
    const data=this.data(), cell=this.selected;
    if(!data || !this.admin || data.locked || this.busy())return;
    this.busy.set(true);this.saveError.set('');
    try{
      const body=cell?{studentId:cell.student.key,day:cell.day,code:this.code,revision:data.revision}:{month:data.month,revision:data.revision};
      await this.session.authenticated<string>('attendance/students/'+(cell?'mark':'lock'),'PUT',body);
      dialog.close();this.notice.set(cell?'Attendance saved.':'Month locked.');await this.load();
    }catch(e){this.saveError.set(authMessage(e));}finally{this.busy.set(false);}
  }
  async reload(dialog:HTMLDialogElement){dialog.close();await this.load();}
  exportCsv(){
    const lines=[['Student ID','Student',...this.days().map(d=>d.day),'P','A'],
      ...this.rows.map(r=>[r.id,r.name,...r.marks.map(c=>c?.code || ''),r.present,r.absent])];
    const escape=(v:string|number)=>'"'+String(v).replace(/^[=+@\-\t\r]/,m=>"'"+m).replaceAll('"','""')+'"';
    const url=URL.createObjectURL(new Blob([lines.map(r=>r.map(escape).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='Student Attendance '+this.month.slice(0,7)+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}
