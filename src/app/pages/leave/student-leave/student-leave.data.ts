import { records as students } from '../../user-directory/students/students.data';
import { Screen } from '../../../data/screen-model';

export const leaveTypes=['Exam Leave','Casual Leave','On-Duty Leave','Sick Leave'];
const reasons=['Semester examination','Family commitment','University event','Medical appointment'];
const dateFormat=new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
export const applications=Array.from({length:35},(_,i)=>{
  const student=students[(72+i*17)%students.length];
  const typeIndex=[0,0,1,1,0,0,2,1,3,1][i%10];
  const status=i===8||i===26?'Rejected':i>=29?'Pending':'Approved';
  const month=status==='Pending'?10:[7,2,1,2][typeIndex];
  const day=status==='Pending'?21+i%6:2+Math.floor(i/2);
  const start=Date.UTC(2026,month,day),duration=typeIndex%2===0?2:1;
  const applied=start-(status==='Pending'?7:5)*86400000;
  return {key:'SL-'+(1001+i),student,typeIndex,type:leaveTypes[typeIndex],reason:reasons[typeIndex],status,duration,
    from:dateFormat.format(start),to:dateFormat.format(start+(duration-1)*86400000),applied:dateFormat.format(applied),
    age:Math.floor((Date.UTC(2026,10,20)-applied)/86400000)};
});
export type Application=typeof applications[number];
export const records:Screen={fields:['Student','Leave type','From','Until','Approver','Status'],rows:applications.map(a=>[a.student.name,a.type,a.from,a.to,a.student.mentor,a.status])};