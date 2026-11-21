import { Screen } from '../../../data/screen-model';

const roster = [
  ['Prof. Karan Joshi','Computer Science','Professor','2015-06-15','18.7','Distributed Systems','DBMS,Computer Networks'],
  ['Dr. Meera Iyer','Electronics','Associate Professor','2016-07-18','13.4','Embedded Systems','Digital Electronics'],
  ['Dr. Rajesh Kulkarni','Mechanical','Professor','2014-01-09','19.0','Thermodynamics','Thermodynamics,Machine Design,Fluid Mechanics'],
  ['Prof. Anita Deshmukh','Civil','Professor','2016-03-23','18.4','Geotechnical Engineering','Structural Analysis,Concrete Technology'],
  ['Dr. Sneha Kulkarni','Physics','Assistant Professor','2019-08-05','9.5','Nuclear Physics','Engineering Physics,Quantum Mechanics'],
  ['Prof. Sanjay Mehta','Commerce','Professor','2013-11-11','19.0','Corporate Law','Business Law'],
  ['Dr. Arun Verma','Computer Science','Associate Professor','2018-02-02','13.0','Operating Systems','Operating Systems'],
  ['Dr. Kavita Rao','Computer Science','Assistant Professor','2021-07-14','9.2','Database Systems','Data Structures'],
  ['Nitin Bose','Computer Science','Lab Instructor','2022-02-19','4.3','Computer Networks','Network Lab'],
  ['Dr. Farida Khan','Electronics','Assistant Professor','2020-08-08','9.3','Signal Processing','Digital Circuits'],
  ['Dr. Neelam Bhargava','Law','Professor','2016-06-10','10.4','Public Law','Constitutional Law'],
  ['Dr. Riya Mehta','Mathematics','Assistant Professor','2021-07-01','7.0','Applied Mathematics','Calculus'],
  ['Dr. Aditya Shah','Civil','Lecturer','2020-11-10','5.4','Urban Planning','Surveying'],
  ['Dr. Leena Nair','Commerce','Lecturer','2023-05-12','2.9','Accounting','Finance'],
  ['Ira Sethi','Mathematics','Visiting Faculty','2026-11-02','2.4','Statistics','Probability'],
  ['Raj Sen','Physics','Lab Instructor','2024-07-17','1.8','Optics','Physics Lab']
];
export const faculty = roster.map(([name,department,designation,joined,salary,specialty,subjects],i)=>({
  name,department,designation,joined,salary,specialty,subjects:subjects.split(','),id:'EMP-'+(2003+i),
  status:i===14?'Probation':i===15?'On Notice':'Active',newlyJoined:i===14,
  campus:['North Campus','North Campus','South Campus','South Campus','Central Block'][i%5],
  blood:['A+','O−','O−','AB−','B−','AB+'][i%6],marital:i%4===3?'Single':'Married',
  appointment:i===14?'Visiting':'Permanent',disability:i===12?'Declared':'None',shift:i===15?'Evening':'Academic Day',
  qualification:['Ph.D., M.E.','Ph.D., M.Tech','Ph.D.','Ph.D., M.Sc'][i%4],photo:[1,0,2,3,0,4,5,0][i%8],
  manager:'Rekha Nair'
}));
export type Faculty = typeof faculty[number];
export const records:Screen={fields:['Faculty member','Department','Faculty ID','Designation','Office','Status'],grid:true,
  rows:faculty.map(f=>[f.name,f.department,f.id,f.designation,f.campus,f.status])};