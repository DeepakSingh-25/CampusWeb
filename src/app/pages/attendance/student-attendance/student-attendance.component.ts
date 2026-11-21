import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { records } from '../../user-directory/students/students.data';
import { Pagination, PageWindow } from '../../../shared/pagination/pagination.component';

const credit:Record<string,number>={PR:1,LT:1,EE:1,SP:1,FT:1,OD:1,HD:0.5};
const leaveCodes=['LV','SL','CL','ML'];
const codes:Record<string,string>={PR:'Present',AB:'Absent',LV:'Leave',SL:'Sick leave',CL:'Casual leave',ML:'Medical leave',HD:'Half day',LT:'Late',EE:'Early exit',SP:'Sports',FT:'Field trip',OD:'On duty',WO:'Week off',PH:'Public holiday',HO:'Holiday',UA:'Unauthorised absence'};
const snapshot=new Date(2026,10,20);
@Component({selector:'campus-attendance-student-attendance',imports:[FormsModule,Pagination],templateUrl:'./student-attendance.component.html',styleUrl:'./student-attendance.component.css'})
export class AttendanceStudentAttendancePage {
  month=new Date(2026,10,1);
  query=''; department=''; paging=new PageWindow(1,10);
  legend=Object.entries(codes);
  modes=['Biometric','RFID Card','QR Session','Manual Entry'];
  departments=['Computer Science','Law'];
  roster=records.map((s,i)=>({...s,index:i,department:s.programme==='B.Tech CSE'?'Computer Science':'Law',initials:s.name.split(' ').map(n=>n[0]).join('')}));
  days=this.buildDays();
  register=this.buildRegister();
  get current(){return this.month.getTime()===new Date(2026,10,1).getTime();}
  get title(){return this.month.toLocaleDateString('en-GB',{month:'long',year:'numeric'});}
  get key(){return 'campus.student-attendance.lock.'+this.month.getTime();}
  get locked(){return localStorage.getItem(this.key)==='1';}
  lock(){if(!this.current)localStorage.setItem(this.key,'1');}
  move(offset:number){
    if(offset>0&&this.current)return;
    this.month=new Date(this.month.getFullYear(),this.month.getMonth()+offset,1);
    this.days=this.buildDays();this.register=this.buildRegister();this.paging.page=1;
  }
  buildDays(){const y=this.month.getFullYear(),m=this.month.getMonth();return Array.from({length:new Date(y,m+1,0).getDate()},(_,i)=>{
    const date=new Date(y,m,i+1),weekday=date.getDay();
    return {n:i+1,label:'SMTWTFS'[weekday],weekend:weekday===0||weekday===6,today:+date===+snapshot,future:date>snapshot,end:weekday===0};
  });}
  buildRegister(){return this.roster.map(person=>{
    const marks=this.days.map(d=>{
      if(d.future)return '';if(d.weekend)return 'WO';
      const v=(person.index*31+d.n*13+this.month.getMonth())%101;
      return v<6?'AB':v<9?'UA':v<14?leaveCodes[v%4]:v<29?['HD','LT','EE','FT','OD','SP'][v%6]:'PR';
    });
    return {...person,marks,present:marks.reduce((n,c)=>n+(credit[c]||0),0),absent:marks.filter(c=>c==='AB'||c==='UA').length};
  });}
  get rows(){const q=this.query.trim().toLowerCase();return this.register.filter(r=>(!this.department||r.department===this.department)&&[r.name,r.id,r.programme].join(' ').toLowerCase().includes(q));}
  get stats(){
    const rows=this.rows,working=this.days.filter(d=>!d.weekend&&!d.future).length;
    const present=rows.reduce((n,r)=>n+r.present,0);
    const today=rows.filter(r=>credit[r.marks[snapshot.getDate()-1]]>0).length;
    return [[rows.length,'Total students'],[working&&rows.length?Math.round(100*present/(working*rows.length))+'%':'—','Attendance'],[rows.reduce((n,r)=>n+r.absent,0),'Absent (month)'],[rows.reduce((n,r)=>n+r.marks.filter(c=>leaveCodes.includes(c)).length,0),'On leave (month)'],[this.current?today:'—','Present (today)'],[this.current?rows.length-today:'—','Off / leave (today)']];
  }
  exportCsv(){
    const csv=[['Student ID','Student',...this.days.map(d=>d.n),'P','A'],...this.rows.map(r=>[r.id,r.name,...r.marks,r.present,r.absent])];
    const url=URL.createObjectURL(new Blob([csv.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='Attendance '+this.title+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}