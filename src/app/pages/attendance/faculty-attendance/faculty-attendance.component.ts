import { Component } from '@angular/core';
import { AttendanceRegister } from '../../../shared/attendance-register/attendance-register.component';

@Component({
  selector: 'campus-attendance-faculty-attendance',
  imports: [AttendanceRegister],
  templateUrl: './faculty-attendance.component.html'
})
export class AttendanceFacultyAttendancePage {}
