import { records as students } from '../../user-directory/students/students.data';
import { records as machines } from '../biometric-machines/biometric-machines.data';
import { Screen } from '../../../data/screen-model';

export const records:Screen={
  fields:['User','User ID','Machine','Method','Status'],
  rows:students.slice(0,33).map((s,i)=>[
    s.name,s.id,machines.rows[i%4][0],['Face','Fingerprint','Face','RFID card'][i%4],'Enrolled'
  ])
};