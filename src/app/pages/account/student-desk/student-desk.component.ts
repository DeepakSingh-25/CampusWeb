import { Component } from '@angular/core';

@Component({selector:'campus-student-desk',templateUrl:'./student-desk.component.html',styleUrl:'../account-layout.css'})
export class StudentDesk {
  selected='Overview';
  groups=[
    {name:'',items:['Overview','My Requests']},
    {name:'Academics',items:['My Attendance','Academic Information','My Timetable','Leave & Absence']},
    {name:'Campus Life',items:['My Hostel','My Night-Outs','My Library','Events & Holidays']},
    {name:'Me',items:['Notifications','My Documents','My Profile','Help & Support']}
  ];
  shortcuts=[['Leave','Leave & Absence'],['Regularize','My Attendance'],['Night-Out','My Night-Outs'],['Gate Pass','My Requests'],['Library','My Library'],['Certificate','My Documents'],['Grievance','Help & Support']];
  cards=[
    {key:'My Attendance',title:'My Attendance · This Month',icon:'fingerprint',stats:[['11','Present'],['5','Week off'],['2','Medical leave']],rows:[['Late entry','1'],['Field trip','1']],note:'November 2026 · worked 83:14'},
    {key:'My Requests',title:'My Requests',icon:'inbox',stats:[['3','Raised'],['2','Pending'],['1','Approved']],rows:[['Leave','1'],['Hostel','1'],['Document','1'],['Last raised','17 Nov 2026']],note:''},
    {key:'Leave & Absence',title:'Leave Balances',icon:'plane-departure',stats:[['16','Available'],['8','Used'],['24','Entitled']],rows:[['Sick leave','3/10'],['Casual leave','7/8'],['Exam leave','6/6']],note:''},
    {key:'My Timetable',title:'Today at a Glance',icon:'calendar-days',stats:[['6','Periods'],['4','Subjects'],['Sec A','My class']],rows:[['Period 1 · Operating Systems','Dr. Arun Verma'],['Period 2 · Data Structures','Prof. Karan Joshi']],note:''},
    {key:'Academic Information',title:'Academic Information',icon:'book-open',stats:[['Sem 5','B.Tech CSE'],['4','Subjects'],['15','Classmates']],rows:[['Data Structures','Prof. Karan Joshi'],['Operating Systems','Dr. Arun Verma'],['Database Systems','Dr. Kavita Rao'],['Computer Networks','Nitin Bose']],note:''},
    {key:'My Hostel',title:'My Hostel',icon:'house',stats:[],rows:[],note:'You are a day scholar — no bed allotted.'},
    {key:'My Library',title:'Library Loans',icon:'book',stats:[['1','On loan'],['0','Overdue']],rows:[['Clean Code','Due 26 Nov']],note:''},
    {key:'My Night-Outs',title:'Night-Outs',icon:'moon',stats:[['0','Outside'],['1','Returned']],rows:[['Last return','18 Nov 2026']],note:''},
    {key:'Events & Holidays',title:'Events & Holidays',icon:'calendar',stats:[],rows:[['Diwali','8 Nov 2026'],['Govardhan Puja','9 Nov 2026']],note:''}
  ];
  details:Record<string,string[][]>={
    'Notifications':[['Library reminder','Clean Code is due on 26 November.']],
    'My Documents':[['Student ID','STU-24001'],['Enrolment certificate','Requested']],
    'My Profile':[['Name','Aarav Sharma'],['Programme','B.Tech CSE'],['Class','Semester 5 · Section A']],
    'Help & Support':[['Class teacher','Nitin Bose'],['Student support','Campus administration office']]
  };
  get visibleCards(){return this.selected==='Overview'?this.cards:this.cards.filter(c=>c.key===this.selected);}
}