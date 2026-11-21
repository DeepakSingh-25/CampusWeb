import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageWindow, Pagination } from '../../../shared/pagination/pagination.component';
import { applications, Application, leaveTypes } from './student-leave.data';

@Component({selector:'campus-leave-student-leave',imports:[FormsModule,Pagination],templateUrl:'./student-leave.component.html',styleUrl:'./student-leave.component.css'})
export class LeaveStudentLeavePage {
  all=applications;types=leaveTypes;programmes=[...new Set(this.all.map(a=>a.student.programme))];
  statuses=['All requests','Pending','Approved','Rejected'];
  status=this.statuses[0];query='';type='';programme='';
  paging=new PageWindow(1,10);checked=new Set<string>();detail?:Application;
  count(s:string){return s===this.statuses[0]?this.all.length:this.all.filter(a=>a.status===s).length;}
  get rows(){const q=this.query.trim().toLowerCase();return this.all.filter(a=>(this.status===this.statuses[0]||this.status===a.status)&&(!this.type||this.type===a.type)&&(!this.programme||this.programme===a.student.programme)&&[a.student.name,a.student.id,a.reason].join(' ').toLowerCase().includes(q));}
  get visible(){return this.paging.slice(this.rows);}
  get selectedPage(){return this.visible.length>0&&this.visible.every(a=>this.checked.has(a.key));}
  select(key:string){if(this.checked.has(key))this.checked.delete(key);else this.checked.add(key);}
  selectPage(){const remove=this.selectedPage;this.visible.forEach(a=>remove?this.checked.delete(a.key):this.checked.add(a.key));}
  open(a:Application,dialog:HTMLDialogElement){this.detail=a;dialog.showModal();}
}