import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { profileDefaults } from '../../../data/catalog';

@Component({
  selector: 'campus-settings-campus-profile',
  imports: [FormsModule],
  templateUrl: './campus-profile.component.html'
})
export class SettingsCampusProfilePage {
  @Input({required:true}) profile!: Record<string,string>;
  fields=Object.keys(profileDefaults);
  saved=false;
  saveProfile(){localStorage.setItem('campus.profile',JSON.stringify(this.profile));this.saved=true;}
}
