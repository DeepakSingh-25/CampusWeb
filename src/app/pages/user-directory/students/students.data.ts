import { students } from '../../../data/catalog';
export const programmes = ['B.Tech CSE', 'B.A. LL.B.', 'B.B.A. LL.B.'];
export const statuses = ['On Roll','Provisional','On Long Leave','Passed Out','TC Issued'];
export const residences = ['Day Scholar','Vindhya Hostel','Shivalik Hostel','Nilgiri Hostel'];
export const fees = ['Paid','Part paid','Overdue'];
const givenNames=['Diya','Ishaan','Meher','Navya','Neel','Anika','Rohan','Tara','Dev','Mira','Riya','Aditi','Kabir','Nisha','Veer','Anvi','Aryan'];
const familyNames=['Singh','Joshi','Kulkarni','Menon','Kapoor','Das','Bhat','Seth','Reddy','Shah'];
const cohort=[...students,...familyNames.flatMap(family=>givenNames.map(given=>given+' '+family))];
export const records = cohort.map((name,i)=>({
  name, id:'STU-'+(24001+i), programme:programmes[i<5?0:i%3],
  semester:i<120?5:1, section:i%10<5?'A':'B', residence:residences[[0,1,0,1,0,2,1,3,0,1][i%10]],
  mentor:i<6?'Dr. Arun Verma':'Dr. Neelam Bhargava',
  fees:fees[[0,0,0,0,2,1,0,0,2,1][i%10]], status:statuses[i<167?0:i<169?1:i<175?2:i<178?3:4],
  admitted:(i<120?'2024':'2026')+'-07-'+String(10+i%18),
  photo:i<10?[1,0,2,3,0,4,0,0,5,0][i]:0, blood:['B+','O−','A+','B−'][i%4]
}));
export type Student = typeof records[number];

