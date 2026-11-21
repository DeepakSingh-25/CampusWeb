import { Component, Input } from '@angular/core';
import { MonthlyView } from './monthly-view/monthly-view.component';
import { YearlyView } from './yearly-view/yearly-view.component';
import { LeaveHolidaySetupPage } from '../holiday-setup/holiday-setup.component';

const holidays = [
  {day:8,name:'Diwali',category:'Campus holiday',note:'Festival of lights — campus closed.',scope:'Entire campus',impact:'212 people · 6 programme(s)',academic:false},
  {day:9,name:'Govardhan Puja',category:'Academic holiday',note:'Diwali-week observance — classes suspended.',scope:'Students, Faculty',impact:'196 people · 6 programme(s)',academic:true}
];
const requests = [
  {name:'Suresh Babu',initials:'SB',group:'Employees',detail:'Library · EMP-2019',type:'Loss of Pay',start:6,end:6,status:'Applied'},
  {name:'Bharat Singh',initials:'BS',group:'Students',detail:'Computer Science',type:'Personal leave',start:9,end:9,status:'Applied'},
  {name:'Kavya Nair',initials:'KN',group:'Students',detail:'Law',type:'Medical leave',start:9,end:9,status:'Applied'},
  {name:'Kiran Rao',initials:'KR',group:'Faculty',detail:'Academic Block',type:'Casual leave',start:10,end:10,status:'Approved'},
  {name:'Manish Kumar',initials:'MK',group:'Employees',detail:'Administration',type:'Casual leave',start:10,end:10,status:'Approved'},
  {name:'Meera Iyer',initials:'MI',group:'Faculty',detail:'Mathematics',type:'Earned leave',start:25,end:28,status:'Applied'},
  {name:'Ravi Kumar',initials:'RK',group:'Faculty',detail:'Computer Science',type:'Earned leave',start:25,end:28,status:'Applied'}
];

@Component({selector:'campus-leave-calendar',imports:[MonthlyView,YearlyView,LeaveHolidaySetupPage],templateUrl:'./leave-calendar.component.html',styleUrl:'./leave-calendar.component.css'})
export class LeaveCalendar {
  @Input() view='Monthly view';
  @Input() views:string[]=[];
  @Input() base='';
  date=new Date(2026,10,1);
  selected=0; group='All'; status='All';
  groups=['All','Students','Faculty','Employees'];
  icons=['users','user-graduate','chalkboard-user','id-badge'];
  week=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  months=Array.from({length:12},(_,i)=>new Date(2026,i,1).toLocaleString('en',{month:'long'}));
  get year(){return this.date.getFullYear();}
  get month(){return this.date.getMonth();}
  get title(){return this.months[this.month]+' '+this.year;}
  get demoMonth(){return this.year===2026 && this.month===10;}
  get dates(){return [...Array<number>(this.date.getDay()).fill(0),...Array.from({length:new Date(this.year,this.month+1,0).getDate()},(_,i)=>i+1)];}
  get monthHolidays(){return this.demoMonth ? holidays.filter(h=>!(h.academic && this.group==='Employees')):[];}
  get sideHolidays(){return this.monthHolidays.filter(h=>!this.selected || h.day===this.selected);}
  get leaves(){return this.demoMonth?requests.filter(r=>this.group==='All'||r.group===this.group):[];}
  leavesOn(d:number){return this.leaves.filter(r=>r.start<=d && d<=r.end);}
  get sideLeaves(){return this.selected?this.leavesOn(this.selected):this.leaves;}
  get shownLeaves(){return this.sideLeaves.filter(r=>this.status==='All'||r.status===this.status);}
  url(view:string){return this.base+'/'+view.toLowerCase().replaceAll(' ','-');}
  shift(n:number){this.date=new Date(this.year,this.month+n,1);this.selected=0;}
  openMonth(i:number){this.date=new Date(this.year,i,1);this.selected=0;location.hash=this.url('Monthly view');}
  select(d:number){this.selected=this.selected===d?0:d;this.status='All';}
}
