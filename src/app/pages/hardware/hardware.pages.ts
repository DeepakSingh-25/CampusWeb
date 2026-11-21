import { HardwareSetupPage } from './setup/setup.component';
import { HardwareReportsPage } from './reports/reports.component';
import { HardwareBiometricMachinesPage } from './biometric-machines/biometric-machines.component';
import { HardwareEnrolledUsersPage } from './enrolled-users/enrolled-users.component';
import { HardwareBulkEnrollmentPage } from './bulk-enrollment/bulk-enrollment.component';
import { HardwareBackupRestorePage } from './backup-restore/backup-restore.component';

export const HardwarePages = {
  "Setup": HardwareSetupPage,
  "Reports": HardwareReportsPage,
  "Biometric Machines": HardwareBiometricMachinesPage,
  "Enrolled Users": HardwareEnrolledUsersPage,
  "Bulk Enrollment": HardwareBulkEnrollmentPage,
  "Backup & Restore": HardwareBackupRestorePage
};
