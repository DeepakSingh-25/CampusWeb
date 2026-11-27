import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { initials } from '../account-state';
import { CampusSession } from '../campus-session';

@Component({selector:'campus-my-profile', imports:[DatePipe], templateUrl:'./my-profile.component.html', styleUrl:'../account-layout.css'})
export class MyProfile {
  readonly user = inject(CampusSession).user;
  readonly initials = initials;

  tabs = ['Profile','Account & Verification','Login History','Security & Sessions','Notifications'];
  icons = ['user','circle-check','list','shield-halved','bell'];
  tab = this.tabs[0];
  alerts = localStorage.getItem('campus.account.alerts') !== 'off';

  toggleAlerts() {
    this.alerts=!this.alerts;
    localStorage.setItem('campus.account.alerts',this.alerts?'on':'off');
  }
}
