import { UserDirectorySetupPage } from '../../user-directory/setup/setup.component';
import { Component } from '@angular/core';
import { ModuleScreen } from '../../../shared/module-screen/module-screen.component';

@Component({
  selector: 'campus-attendance-setup',
  imports: [ModuleScreen, UserDirectorySetupPage],
  templateUrl: './setup.component.html'
})
export class AttendanceSetupPage {}
