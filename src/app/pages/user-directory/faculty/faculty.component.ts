import { Component } from '@angular/core';
import { StaffDirectory } from '../staff-directory/staff-directory.component';
import { faculty } from './faculty.data';

@Component({
  selector:'campus-user-directory-faculty',
  imports:[StaffDirectory],
  templateUrl:'./faculty.component.html'
})
export class UserDirectoryFacultyPage {
  people=faculty;
}
