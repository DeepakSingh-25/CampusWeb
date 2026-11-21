import { LeaveStudentLeavePage } from './student-leave/student-leave.component';
import { LeaveFacultyLeavePage } from './faculty-leave/faculty-leave.component';
import { LeaveEmployeeLeavePage } from './employee-leave/employee-leave.component';
import { LeaveLeaveBalancesPage } from './leave-balances/leave-balances.component';
import { LeaveSetupPage } from './setup/setup.component';
import { LeaveLeavePoliciesPage } from './leave-policies/leave-policies.component';
import { LeaveReportsPage } from './reports/reports.component';
import { LeaveHolidaySetupPage } from './holiday-setup/holiday-setup.component';

export const LeavePages = {
  "Student Leave": LeaveStudentLeavePage,
  "Faculty Leave": LeaveFacultyLeavePage,
  "Employee Leave": LeaveEmployeeLeavePage,
  "Leave Balances": LeaveLeaveBalancesPage,
  "Setup": LeaveSetupPage,
  "Leave Policies": LeaveLeavePoliciesPage,
  "Reports": LeaveReportsPage,
  "Holiday Setup": LeaveHolidaySetupPage
};
