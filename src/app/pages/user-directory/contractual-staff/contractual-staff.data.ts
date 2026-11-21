import { screen } from '../../../data/screen-model';

export const records = {...screen('Staff member|Contract company|Staff ID|Assigned post|Contract end|Status',
      'Rajesh Kumar|Sentinel Facility Services|CTR-101|Main Gate Security|31 Mar 2027|Deployed',
      'Kavita Devi|Sarasvati Food Services|CTR-102|Central Mess|31 May 2027|Deployed',
      'Amit Yadav|Marudhar Transport|CTR-103|Campus Transport|31 Mar 2027|Standby'),grid:true};

import type { DirectoryPerson } from '../staff-directory/directory-person';

const details = [
  {joined:'2025-04-01',salary:'2.22',campus:'Main Gate',manager:'Rajendra Solanki',shift:'Night shift',qualification:'Security training',specialty:'Access control',subjects:['Gate duty','Security'],blood:'O+',marital:'Married',photo:0},
  {joined:'2026-06-01',salary:'1.92',campus:'Central Block',manager:'Devendra Purohit',shift:'Day shift',qualification:'Food safety training',specialty:'Catering',subjects:['Dining services','Food preparation'],blood:'B+',marital:'Single',photo:3},
  {joined:'2025-04-01',salary:'2.52',campus:'Transport Office',manager:'Bhanwar Lal Jat',shift:'Day shift',qualification:'Commercial driving licence',specialty:'Transport operations',subjects:['Campus routes','Vehicle checks'],blood:'A+',marital:'Married',photo:0}
];

export const contractualStaff:DirectoryPerson[] = records.rows.map(([name,department,id,designation,contractEnd,status],i)=>({
  ...details[i],name,department,id,designation,contractEnd,status,appointment:'Contract',disability:'None',newlyJoined:false
}));
