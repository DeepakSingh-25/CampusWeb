import {Component,Input} from '@angular/core';
import {students} from '../../data/catalog';
import {screens} from '../../data/screens';
import {PageWindow,Pagination} from '../pagination/pagination.component';

@Component({selector:'campus-attendance-register',imports:[Pagination],templateUrl:'./attendance-register.component.html'})
export class AttendanceRegister {
  @Input({required:true}) registerLabel!:string;
  days = Array.from({length:30},(_,i)=>i+1);
  registerPaging=new PageWindow();
  get registerNames(){return this.registerLabel==='Student'?students:screens['User Directory'][this.registerLabel].rows.map(row=>row[0]);}
  attendance(person:number,day:number){if(day>19)return '—';if([0,6].includes((day-1)%7))return 'WO';if((person+day)%17===0)return 'AB';return (person+day)%11===0?'LT':'PR';}
}
