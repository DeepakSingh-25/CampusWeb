import { screen } from '../../../data/screen-model';

export const records = {...screen('Employee|Department|Employee ID|Designation|Shift|Status',
      'Suresh Babu|Central Library|EMP-2019|Library Assistant|Day shift|Active',
      'Asha Kamble|Student Affairs|EMP-2020|Hostel Warden|Evening shift|Active',
      'Devendra Joshi|Hostel Administration|EMP-2021|Hostel Warden|Day shift|On leave'),grid:true};

import type { DirectoryPerson } from '../staff-directory/directory-person';

const details = [
  {joined:'2017-07-12',salary:'4.8',campus:'Central Block',manager:'Rekha Nair',qualification:'B.Lib.Sc.',specialty:'Library services',subjects:['Circulation','Member services'],blood:'A+',marital:'Married',photo:1},
  {joined:'2019-04-08',salary:'5.4',campus:'North Campus',manager:'Manish Kumar',qualification:'B.A.',specialty:'Residential life',subjects:['Student welfare','Hostel operations'],blood:'O+',marital:'Single',photo:0},
  {joined:'2018-08-21',salary:'5.6',campus:'South Campus',manager:'Manish Kumar',qualification:'M.A.',specialty:'Hostel administration',subjects:['Allotments','Facilities'],blood:'B+',marital:'Married',photo:2}
];

export const employees:DirectoryPerson[] = records.rows.map(([name,department,id,designation,shift,status],i)=>({
  ...details[i],name,department,id,designation,shift,status,appointment:'Permanent',disability:'None',newlyJoined:false
}));
