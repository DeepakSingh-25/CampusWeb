import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampusSession } from '../../account/campus-session';

import { Pagination, PageWindow } from '../../../shared/pagination/pagination.component';
import { IdPreview } from '../students/id-preview/id-preview.component';
import { CardHolder } from '../students/id-preview/card-artwork';
import type { DirectoryPerson } from './directory-person';

@Component({selector:'campus-staff-directory',imports:[FormsModule,Pagination,IdPreview],
  templateUrl:'./staff-directory.component.html',styleUrls:['../students/students.component.css','./staff-directory.component.css']})
export class StaffDirectory implements OnInit {
  @Input({required:true}) people!: DirectoryPerson[];
  @Input({required:true}) kind!: 'Faculty'|'Employees'|'Contractual Staff';
  staff:DirectoryPerson[]=[];
  departments:string[]=[];
  get contract(){return this.kind==='Contractual Staff';}
  get isFaculty(){return this.kind==='Faculty';}
  get unitLabel(){return this.contract?'Contract company':'Department';}
  get unitPrompt(){return this.contract?'All companies':'All departments';}
  get roleLabel(){return this.contract?'Assigned post':'Designation';}
  get idLabel(){return this.contract?'Staff ID':'Employee ID';}
  get title(){return this.kind==='Employees'?'Employee':this.kind;}
  ngOnInit(){
    this.staff=this.people.map(person=>({...person}));
    this.departments=this.options('department');
    this.grid = this.session.user()?.directoryView !== 'List';
    if(!this.isFaculty){
      this.groups=['Total',...new Set(this.staff.map(person=>person.status)),'On Notice'];

    }
  }
  private readonly session = inject(CampusSession);
  get campus() { return this.session.user()?.companyName || 'CampusTrack'; }
  groups=['Total','Newly joined','Active','Probation','On Notice','Relieved'];
  group='Total';department='';query='';grid=true;advanced=false;
  filters=[
    {label:'Blood group',key:'blood',all:'All blood groups',value:''},
    {label:'Disability status',key:'disability',all:'Disability — any',value:''},
    {label:'Marital status',key:'marital',all:'All marital statuses',value:''},
    {label:'Appointment type',key:'appointment',all:'All appointment types',value:''},
    {label:'Assigned shift',key:'shift',all:'All shifts',value:''}
  ] satisfies {label:string;key:keyof DirectoryPerson;all:string;value:string}[];

  paging=new PageWindow(1,12);
  checked=new Set<string>();
  mode='';current?:DirectoryPerson;draft='';cards:CardHolder[]=[];
  options(key:keyof DirectoryPerson){return [...new Set(this.staff.map(f=>String(f[key] ?? '')))].sort();}
  matches(f:DirectoryPerson,g:string){return g==='Total'||(g==='Newly joined'?f.newlyJoined:f.status===g);}
  count(g:string){return this.staff.filter(f=>this.matches(f,g)).length;}
  get monthly(){return Math.round(this.staff.reduce((sum,f)=>sum+Number(f.salary)*100000/12,0)).toLocaleString('en-IN');}
  get rows(){const q=this.query.toLowerCase().trim();return this.staff.filter(f=>this.matches(f,this.group)&&(!this.department||this.department===f.department)&&this.filters.every(a=>!a.value||f[a.key]===a.value)&&[f.name,f.id,f.designation,f.department,f.shift,f.status,f.contractEnd].join(' ').toLowerCase().includes(q));}
  get visible(){return this.paging.slice(this.rows);}
  get allChecked(){return this.visible.length>0 && this.visible.every(f=>this.checked.has(f.id));}
  reset(){this.filters.forEach(a=>a.value='');this.query=this.department='';this.group='Total';this.paging.page=1;}
  toggle(id:string){if(this.checked.has(id))this.checked.delete(id);else this.checked.add(id);}
  togglePage(){const remove=this.allChecked;this.visible.forEach(f=>remove?this.checked.delete(f.id):this.checked.add(f.id));}
  initials(name:string){return name.replace(/^(Dr\.|Prof\.)\s*/,'').split(' ').map(w=>w[0]).slice(0,2).join('');}
  date(f:DirectoryPerson){return f.joined.split('-').reverse().join('-');}
  years(f:DirectoryPerson){return ((Date.UTC(2026,10,20)-Date.parse(f.joined))/31557600000).toFixed(1);}
  open(mode:string,d:HTMLDialogElement,f?:DirectoryPerson){
    this.mode=mode;this.current=f;this.draft=f?.name||'';
    if(mode==='ID Card'){
      const batch=f?[f]:this.checked.size?this.staff.filter(p=>this.checked.has(p.id)):this.visible;
      this.cards=batch.map(p=>({...p,programme:p.department,residence:p.campus,admitted:p.joined,mentor:p.manager,kind:this.contract?'Contractual Staff':this.isFaculty?'Faculty':'Employee'}));
    }
    d.showModal();
  }
  save(d:HTMLDialogElement){
    if(!this.current)return;
    if(this.mode==='Edit' && this.draft.trim())this.current.name=this.draft.trim();
    if(this.mode==='Put on notice'){this.current.status='On Notice';this.paging.page=1;}
    d.close();
  }
}
