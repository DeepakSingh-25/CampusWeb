import { Component, Input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { HardwarePages } from '../hardware.pages';

@Component({selector:'campus-machine-console',imports:[NgComponentOutlet],templateUrl:'./machine-console.component.html',styleUrl:'./machine-console.component.css'})
export class MachineConsole {
  @Input({required:true}) tabs!:string[];
  icons=['fingerprint','users','file-arrow-up','database'];
  paths=['biometric-machines','enrolled-users','bulk-enrollment','backup-restore'];
  @Input({required:true}) tab!:string;
  get page(){return HardwarePages[this.tab as keyof typeof HardwarePages];}
}
