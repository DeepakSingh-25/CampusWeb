import { AfterViewInit, Component, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({selector:'campus-change-password',templateUrl:'./change-password.component.html',styleUrl:'../account-layout.css'})
export class ChangePassword implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Output() dismissed = new EventEmitter<void>();
  labels=['Current Password','New Password','Retype New Password'];
  hints=['Enter your current password','Enter a new password','Re-enter the new password'];
  values=['','',''];
  visible=[false,false,false];
  message='';
  ngAfterViewInit(){this.modal.nativeElement.showModal();}
  get rules(){const [old,next]=this.values;return [
    {text:'At least 8 characters',ok:next.length>=8},{text:'An uppercase letter (A–Z)',ok:/[A-Z]/.test(next)},
    {text:'A lowercase letter (a–z)',ok:/[a-z]/.test(next)},{text:'A number (0–9)',ok:/\d/.test(next)},
    {text:'A special character',ok:/[^\w\s]|_/.test(next)},{text:'Different from current password',ok:!!old && !!next && next!==old}
  ];}
  get valid(){return this.rules.every(r=>r.ok) && this.values[1]===this.values[2];}
  submit(){if(this.valid){this.values=['','',''];this.message='Demo complete. Password policy checks passed.';}}
}