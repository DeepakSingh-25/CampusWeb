import { Component } from '@angular/core';
import { StaffDirectory } from '../staff-directory/staff-directory.component';
import { contractualStaff } from './contractual-staff.data';

@Component({
  selector:'campus-user-directory-contractual-staff',
  imports:[StaffDirectory],
  templateUrl:'./contractual-staff.component.html'
})
export class UserDirectoryContractualStaffPage {
  people=contractualStaff;
}
