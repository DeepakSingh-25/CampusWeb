import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModuleScreen } from '../../../shared/module-screen/module-screen.component';
import { CampusSession, authMessage } from '../../account/campus-session';
import { AttendanceCode } from '../student-register';

@Component({selector:'campus-attendance-attendance-code', imports:[ModuleScreen, FormsModule], templateUrl:'./attendance-code.component.html'})
export class AttendanceAttendanceCodePage {
  readonly session=inject(CampusSession);
  readonly codes=signal<AttendanceCode[]>([]);
  readonly loading=signal(true);
  readonly busy=signal(false);
  readonly loadError=signal('');
  readonly error=signal('');
  readonly message=signal('');
  readonly categories=['Working','Absence','Leave','Non-working'];
  draft?:AttendanceCode;
  readonly table=computed(()=>({fields:['Code','Meaning','Daily credit','Category'],
    rows:this.codes().map(c=>[c.code,c.meaning,c.credit+(c.credit===1?' day':' days'),c.category])}));
  ngOnInit(){void this.load();}
  async load(){
    this.loading.set(true);this.loadError.set('');
    try{this.codes.set(await this.session.authenticated<AttendanceCode[]>('attendance/codes','GET'));}
    catch(e){this.loadError.set(authMessage(e));}finally{this.loading.set(false);}
  }
  start(){this.error.set('');this.message.set('');this.draft={code:'', meaning:'',category:'Working',credit:1};}
  async save(){
    if(!this.draft || this.busy())return;
    this.busy.set(true);this.error.set('');
    try{
      const saved=await this.session.authenticated<AttendanceCode>('attendance/codes','POST',this.draft);
      this.codes.update(list=>[...list,saved].sort((a,b)=>a.code.localeCompare(b.code)));
      this.message.set(saved.code+' saved.');this.draft=undefined;
    }catch(e){this.error.set(authMessage(e));}finally{this.busy.set(false);}
  }
}
