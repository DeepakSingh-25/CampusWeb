import { SettingsBranchesPage } from './branches/branches.component';
import { SettingsDepartmentsPage } from './departments/departments.component';
import { SettingsDesignationsPage } from './designations/designations.component';
import { SettingsFeaturesPage } from './features/features.component';
import { SettingsUsersRightsPage } from './users-rights/users-rights.component';
import { SettingsApprovalsPage } from './approvals/approvals.component';
import { SettingsReminderAlertsPage } from './reminder-alerts/reminder-alerts.component';
import { SettingsIntegrationsPage } from './integrations/integrations.component';
import { SettingsPlansSeatsPage } from './plans-seats/plans-seats.component';
import { SettingsTrashPage } from './trash/trash.component';

export const SettingsPages = {
  "Branches": SettingsBranchesPage,
  "Departments": SettingsDepartmentsPage,
  "Designations": SettingsDesignationsPage,
  "Features": SettingsFeaturesPage,
  "Users & Rights": SettingsUsersRightsPage,
  "Approvals": SettingsApprovalsPage,
  "Reminder Alerts": SettingsReminderAlertsPage,
  "Integrations": SettingsIntegrationsPage,
  "Plans & Seats": SettingsPlansSeatsPage,
  "Trash": SettingsTrashPage
};
