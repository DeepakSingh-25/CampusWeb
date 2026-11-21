import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { records } from './biometric-machines.data';
import { PageWindow, Pagination } from '../../../shared/pagination/pagination.component';

const methods=['Face','Fingerprint','RFID card'];
const machines=records.rows.map(([name,location,version,status],i)=>{
  const [gate,branch]=location.split(' · '),[firmware,address]=version.split(' · ');
  return {name,gate,branch,firmware,address,status,serial:'CT-BIO-00'+(i+1),enrolled:33,
    methods:[methods,[methods[1]],[methods[0]],methods.slice(1)][i],
    seen:['27 Aug 2026 09:42','27 Aug 2026 09:40','27 Aug 2026 09:41','26 Aug 2026 20:05'][i]};
});
type Machine=typeof machines[number];
@Component({selector:'campus-hardware-biometric-machines',imports:[FormsModule,Pagination],templateUrl:'./biometric-machines.component.html',styleUrl:'./biometric-machines.component.css'})
export class HardwareBiometricMachinesPage {
  machines=machines.map(m=>({...m}));methods=methods;
  expanded='';
  branches=machines.map(m=>m.branch);
  status='';branch='';query='';grid=true;paging=new PageWindow(1,10);selected?:Machine;
  get rows(){const q=this.query.trim().toLowerCase();return this.machines.filter(m=>(!this.status||m.status===this.status)&&(!this.branch||m.branch===this.branch)&&[m.name,m.branch,m.gate,m.serial,m.address].join(' ').toLowerCase().includes(q));}
  count(s:string){return s?this.machines.filter(m=>m.status===s).length:this.machines.length;}
  setStatus(s:string){this.status=s;this.paging.page=1;}
  show(m:Machine,d:HTMLDialogElement){this.selected=m;d.showModal();}
  refresh(m:Machine){m.seen=new Date().toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});}
  connect(m:Machine){m.status=m.status==='Online'?'Offline':'Online';this.refresh(m);}
}