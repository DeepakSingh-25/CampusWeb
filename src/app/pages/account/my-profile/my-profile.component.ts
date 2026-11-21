import { Component } from '@angular/core';
import { accountEmail, accountName, initials } from '../account-state';

@Component({selector:'campus-my-profile',templateUrl:'./my-profile.component.html',styleUrl:'../account-layout.css'})
export class MyProfile {
  accountName = accountName;
  accountEmail = accountEmail;
  initials = initials;
  campus = JSON.parse(localStorage.getItem('campus.profile') || '{}')['Campus Name'] || 'National Law University, Jodhpur';
  tabs = ['Profile','Account & Verification','Login History','Security & Sessions','Notifications'];
  icons = ['user','circle-check','list','shield-halved','bell'];
  tab = this.tabs[0];
  editing = false;
  alerts = localStorage.getItem('campus.account.alerts') !== 'off';
  message = '';
  get fields() {
    return [
      ['Full name',accountName()],['Employee ID','EMP-1001'],['Job title / Designation','Campus Administrator'],
      ['Department','Campus Operations'],['Organization / Company',this.campus],['Email address',accountEmail()],
      ['Mobile number','+91 98290 12345'],['Alternate contact number','—'],['Date of birth','—'],['Gender','—']
    ];
  }
  save(name:string,email:string) {
    accountName.set(name.trim()); accountEmail.set(email.trim());
    localStorage.setItem('campus.account.name',accountName()); localStorage.setItem('campus.account.email',accountEmail());
    this.editing=false; this.message='Profile saved in this browser.';
  }
  toggleAlerts() {
    this.alerts=!this.alerts;
    localStorage.setItem('campus.account.alerts',this.alerts?'on':'off');
  }
}