import type { Screen } from './screen-model';
export type { Screen } from './screen-model';
import { records as UserDirectoryFacultyData } from '../pages/user-directory/faculty/faculty.data';
import { records as UserDirectoryEmployeesData } from '../pages/user-directory/employees/employees.data';
import { records as UserDirectoryContractualStaffData } from '../pages/user-directory/contractual-staff/contractual-staff.data';
import { records as AttendanceSubjectWiseData } from '../pages/attendance/subject-wise/subject-wise.data';
import { records as AttendanceClassWiseRegisterData } from '../pages/attendance/class-wise-register/class-wise-register.data';
import { records as AttendancePeriodWiseData } from '../pages/attendance/period-wise/period-wise.data';
import { records as AttendanceAttendanceRegularizationData } from '../pages/attendance/attendance-regularization/attendance-regularization.data';
import { records as AttendanceShiftManagementData } from '../pages/attendance/shift-management/shift-management.data';
import { records as AttendanceRosterManagementData } from '../pages/attendance/roster-management/roster-management.data';
import { sources as AttendanceReportsData } from '../pages/attendance/reports/reports.data';
import { records as LeaveHolidaySetupData } from '../pages/leave/holiday-setup/holiday-setup.data';
import { records as LeaveStudentLeaveData } from '../pages/leave/student-leave/student-leave.data';
import { records as LeaveFacultyLeaveData } from '../pages/leave/faculty-leave/faculty-leave.data';
import { records as LeaveEmployeeLeaveData } from '../pages/leave/employee-leave/employee-leave.data';
import { records as LeaveLeaveBalancesData } from '../pages/leave/leave-balances/leave-balances.data';
import { records as LeaveLeavePoliciesData } from '../pages/leave/leave-policies/leave-policies.data';
import { defaults as LeaveSetupData } from '../pages/leave/setup/setup.data';
import { sources as LeaveReportsData } from '../pages/leave/reports/reports.data';
import { records as HostelHostelsData } from '../pages/hostel/hostels/hostels.data';
import { records as HostelDormitoriesData } from '../pages/hostel/dormitories/dormitories.data';
import { records as HostelAllotmentData } from '../pages/hostel/allotment/allotment.data';
import { records as HostelRoomTransferData } from '../pages/hostel/room-transfer/room-transfer.data';
import { records as HostelNightAttendanceData } from '../pages/hostel/night-attendance/night-attendance.data';
import { records as HostelNightOutData } from '../pages/hostel/night-out/night-out.data';
import { records as HostelGatePassData } from '../pages/hostel/gate-pass/gate-pass.data';
import { records as HostelComplaintsData } from '../pages/hostel/complaints/complaints.data';
import { records as HostelBiometricLogsData } from '../pages/hostel/biometric-logs/biometric-logs.data';
import { records as HostelDeviceMappingData } from '../pages/hostel/device-mapping/device-mapping.data';
import { defaults as HostelSetupData } from '../pages/hostel/setup/setup.data';
import { sources as HostelReportsData } from '../pages/hostel/reports/reports.data';
import { records as NightOutNightOutBoardData } from '../pages/night-out/night-out-board/night-out-board.data';
import { records as NightOutVerifyStudentData } from '../pages/night-out/verify-student/verify-student.data';
import { records as NightOutMovementLogData } from '../pages/night-out/movement-log/movement-log.data';
import { defaults as NightOutSetupData } from '../pages/night-out/setup/setup.data';
import { records as LibraryBookSearchData } from '../pages/library/book-search/book-search.data';
import { records as LibraryBooksData } from '../pages/library/books/books.data';
import { records as LibraryIssueReturnData } from '../pages/library/issue-return/issue-return.data';
import { records as LibraryReservationsData } from '../pages/library/reservations/reservations.data';
import { records as LibraryFinesData } from '../pages/library/fines/fines.data';
import { records as LibraryMembersData } from '../pages/library/members/members.data';
import { records as LibraryLibrariesData } from '../pages/library/libraries/libraries.data';
import { records as LibraryCategoriesData } from '../pages/library/categories/categories.data';
import { records as LibraryRacksShelvesData } from '../pages/library/racks-shelves/racks-shelves.data';
import { defaults as LibrarySetupData } from '../pages/library/setup/setup.data';
import { sources as LibraryReportsData } from '../pages/library/reports/reports.data';
import { records as ContractCompaniesCompanyManagementData } from '../pages/contract-companies/company-management/company-management.data';
import { records as ContractCompaniesContractsPostsData } from '../pages/contract-companies/contracts-posts/contracts-posts.data';
import { records as ContractCompaniesStaffPoolData } from '../pages/contract-companies/staff-pool/staff-pool.data';
import { records as ContractCompaniesDailyDeploymentData } from '../pages/contract-companies/daily-deployment/daily-deployment.data';
import { records as ContractCompaniesClaimsBillsData } from '../pages/contract-companies/claims-bills/claims-bills.data';
import { records as ContractCompaniesPaymentSettlementData } from '../pages/contract-companies/payment-settlement/payment-settlement.data';
import { records as ContractCompaniesHistoryAuditData } from '../pages/contract-companies/history-audit/history-audit.data';
import { defaults as ContractCompaniesSetupData } from '../pages/contract-companies/setup/setup.data';
import { sources as ContractCompaniesReportsData } from '../pages/contract-companies/reports/reports.data';
import { records as HardwareBiometricMachinesData } from '../pages/hardware/biometric-machines/biometric-machines.data';
import { records as HardwareEnrolledUsersData } from '../pages/hardware/enrolled-users/enrolled-users.data';
import { records as HardwareBulkEnrollmentData } from '../pages/hardware/bulk-enrollment/bulk-enrollment.data';
import { records as HardwareBackupRestoreData } from '../pages/hardware/backup-restore/backup-restore.data';
import { defaults as HardwareSetupData } from '../pages/hardware/setup/setup.data';
import { sources as HardwareReportsData } from '../pages/hardware/reports/reports.data';
import { records as SettingsFeaturesData } from '../pages/settings/features/features.data';
import { records as SettingsUsersRightsData } from '../pages/settings/users-rights/users-rights.data';
import { records as SettingsApprovalsData } from '../pages/settings/approvals/approvals.data';
import { records as SettingsReminderAlertsData } from '../pages/settings/reminder-alerts/reminder-alerts.data';
import { records as SettingsIntegrationsData } from '../pages/settings/integrations/integrations.data';
import { records as SettingsPlansSeatsData } from '../pages/settings/plans-seats/plans-seats.data';
import { records as SettingsTrashData } from '../pages/settings/trash/trash.data';

export const screens: Record<string, Record<string, Screen>> = {
  "User Directory": {
    "Faculty": UserDirectoryFacultyData,
    "Employees": UserDirectoryEmployeesData,
    "Contractual Staff": UserDirectoryContractualStaffData
  },
  "Attendance": {
    "Subject-Wise": AttendanceSubjectWiseData,
    "Class-Wise Register": AttendanceClassWiseRegisterData,
    "Period-Wise": AttendancePeriodWiseData,
    "Attendance Regularization": AttendanceAttendanceRegularizationData,
    "Shift Management": AttendanceShiftManagementData,
    "Roster Management": AttendanceRosterManagementData,
  },
  "Leave": {
    "Holiday Setup": LeaveHolidaySetupData,
    "Student Leave": LeaveStudentLeaveData,
    "Faculty Leave": LeaveFacultyLeaveData,
    "Employee Leave": LeaveEmployeeLeaveData,
    "Leave Balances": LeaveLeaveBalancesData,
    "Leave Policies": LeaveLeavePoliciesData
  },
  "Hostel": {
    "Hostels": HostelHostelsData,
    "Dormitories": HostelDormitoriesData,
    "Allotment": HostelAllotmentData,
    "Room Transfer": HostelRoomTransferData,
    "Night Attendance": HostelNightAttendanceData,
    "Night-Out": HostelNightOutData,
    "Gate Pass": HostelGatePassData,
    "Complaints": HostelComplaintsData,
    "Biometric Logs": HostelBiometricLogsData,
    "Device Mapping": HostelDeviceMappingData
  },
  "Night Out": {
    "Night Out Board": NightOutNightOutBoardData,
    "Verify Student": NightOutVerifyStudentData,
    "Movement Log": NightOutMovementLogData
  },
  "Library": {
    "Book Search": LibraryBookSearchData,
    "Books": LibraryBooksData,
    "Issue / Return": LibraryIssueReturnData,
    "Reservations": LibraryReservationsData,
    "Fines": LibraryFinesData,
    "Members": LibraryMembersData,
    "Libraries": LibraryLibrariesData,
    "Categories": LibraryCategoriesData,
    "Racks & Shelves": LibraryRacksShelvesData
  },
  "Contract Companies": {
    "Company Management": ContractCompaniesCompanyManagementData,
    "Contracts & Posts": ContractCompaniesContractsPostsData,
    "Staff Pool": ContractCompaniesStaffPoolData,
    "Daily Deployment": ContractCompaniesDailyDeploymentData,
    "Claims / Bills": ContractCompaniesClaimsBillsData,
    "Payment / Settlement": ContractCompaniesPaymentSettlementData,
    "History / Audit": ContractCompaniesHistoryAuditData
  },
  "Hardware": {
    "Biometric Machines": HardwareBiometricMachinesData,
    "Enrolled Users": HardwareEnrolledUsersData,
    "Bulk Enrollment": HardwareBulkEnrollmentData,
    "Backup & Restore": HardwareBackupRestoreData
  },
  "Settings": {
    "Features": SettingsFeaturesData,
    "Users & Rights": SettingsUsersRightsData,
    "Approvals": SettingsApprovalsData,
    "Reminder Alerts": SettingsReminderAlertsData,
    "Integrations": SettingsIntegrationsData,
    "Plans & Seats": SettingsPlansSeatsData,
    "Trash": SettingsTrashData
  }
};
export const setupValues: Record<string, Record<string,string>> = {
  "Leave": LeaveSetupData,
  "Hostel": HostelSetupData,
  "Night Out": NightOutSetupData,
  "Library": LibrarySetupData,
  "Contract Companies": ContractCompaniesSetupData,
  "Hardware": HardwareSetupData
};
export const reportSources: Record<string,string[]> = {
  "Attendance": AttendanceReportsData,
  "Leave": LeaveReportsData,
  "Hostel": HostelReportsData,
  "Library": LibraryReportsData,
  "Contract Companies": ContractCompaniesReportsData,
  "Hardware": HardwareReportsData
};
