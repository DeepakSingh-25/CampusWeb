import { Component } from '@angular/core';
import { AttendanceRegister } from '../../../shared/attendance-register/attendance-register.component';

@Component({
  selector: 'campus-attendance-employee-attendance',
  imports: [AttendanceRegister],
  templateUrl: './employee-attendance.component.html'
})
export class AttendanceEmployeeAttendancePage {}
