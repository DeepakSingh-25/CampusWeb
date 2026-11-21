import { AttendanceStudentAttendancePage } from './student-attendance/student-attendance.component';
import { AttendanceFacultyAttendancePage } from './faculty-attendance/faculty-attendance.component';
import { AttendanceEmployeeAttendancePage } from './employee-attendance/employee-attendance.component';
import { AttendanceContractualStaffAttendancePage } from './contractual-staff-attendance/contractual-staff-attendance.component';
import { AttendanceSubjectWisePage } from './subject-wise/subject-wise.component';
import { AttendanceClassWiseRegisterPage } from './class-wise-register/class-wise-register.component';
import { AttendancePeriodWisePage } from './period-wise/period-wise.component';
import { AttendanceAttendanceRegularizationPage } from './attendance-regularization/attendance-regularization.component';
import { AttendanceShiftManagementPage } from './shift-management/shift-management.component';
import { AttendanceRosterManagementPage } from './roster-management/roster-management.component';
import { AttendanceSetupPage } from './setup/setup.component';
import { AttendanceAttendanceCodePage } from './attendance-code/attendance-code.component';
import { AttendanceReportsPage } from './reports/reports.component';

export const AttendancePages = {
  "Student Attendance": AttendanceStudentAttendancePage,
  "Faculty Attendance": AttendanceFacultyAttendancePage,
  "Employee Attendance": AttendanceEmployeeAttendancePage,
  "Contractual Staff Attendance": AttendanceContractualStaffAttendancePage,
  "Subject-Wise": AttendanceSubjectWisePage,
  "Class-Wise Register": AttendanceClassWiseRegisterPage,
  "Period-Wise": AttendancePeriodWisePage,
  "Attendance Regularization": AttendanceAttendanceRegularizationPage,
  "Shift Management": AttendanceShiftManagementPage,
  "Roster Management": AttendanceRosterManagementPage,
  "Setup": AttendanceSetupPage,
  "Attendance Code": AttendanceAttendanceCodePage,
  "Reports": AttendanceReportsPage
};
