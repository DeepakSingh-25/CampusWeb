import { Type } from '@angular/core';
import { UserDirectoryPages } from './user-directory/user-directory.pages';
import { AttendancePages } from './attendance/attendance.pages';
import { LeavePages } from './leave/leave.pages';
import { HostelPages } from './hostel/hostel.pages';
import { NightOutPages } from './night-out/night-out.pages';
import { LibraryPages } from './library/library.pages';
import { ContractCompaniesPages } from './contract-companies/contract-companies.pages';
import { HardwarePages } from './hardware/hardware.pages';
import { SettingsPages } from './settings/settings.pages';

export const pages: Record<string,Record<string,Type<unknown>>> = {
  "User Directory": UserDirectoryPages,
  "Attendance": AttendancePages,
  "Leave": LeavePages,
  "Hostel": HostelPages,
  "Night Out": NightOutPages,
  "Library": LibraryPages,
  "Contract Companies": ContractCompaniesPages,
  "Hardware": HardwarePages,
  "Settings": SettingsPages
};
