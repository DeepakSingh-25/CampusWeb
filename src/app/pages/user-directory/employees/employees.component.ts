import { Component } from '@angular/core';
import { StaffDirectory } from '../staff-directory/staff-directory.component';
import { employees } from './employees.data';

@Component({
  selector:'campus-user-directory-employees',
  imports:[StaffDirectory],
  templateUrl:'./employees.component.html'
})
export class UserDirectoryEmployeesPage {
  people=employees;
}
