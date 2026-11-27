import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampusProfile, campusProfileFields } from '../../../data/campus-profile';
import { CampusSession, authMessage } from '../../account/campus-session';

@Component({
  selector: 'campus-settings-campus-profile',
  imports: [FormsModule],
  templateUrl: './campus-profile.component.html'
})
export class SettingsCampusProfilePage {
  readonly session = inject(CampusSession);
  readonly fields = campusProfileFields;
  readonly months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  readonly draft = signal<CampusProfile | null>(null);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly saved = signal(false);
  private readonly endpoint = 'settings/campus-profile';

  ngOnInit() { void this.load(); }

  async load() {
    this.busy.set(true);
    this.error.set('');
    try {
      this.draft.set(await this.session.authenticated<CampusProfile>(this.endpoint, 'GET'));
    } catch (error) {
      this.error.set(authMessage(error));
    } finally {
      this.busy.set(false);
    }
  }

  async saveProfile() {
    const profile = this.draft();
    const user = this.session.user();
    if (!profile || this.busy() || user?.role !== 'Owner / Admin') return;
    this.busy.set(true);
    this.saved.set(false);
    this.error.set('');
    try {
      const {gstin, pan, ...body} = profile;
      body.defaultCurrency = body.defaultCurrency.toUpperCase();
      const saved = await this.session.authenticated<CampusProfile>(this.endpoint, 'PUT', body);
      this.draft.set(saved);
      this.session.user.update(current => current?.id === user.id && current.companyId === user.companyId
        ? {...current, companyName: saved.campusName} : current);
      this.saved.set(true);
    } catch (error) {
      this.error.set(authMessage(error));
    } finally {
      this.busy.set(false);
    }
  }
}
