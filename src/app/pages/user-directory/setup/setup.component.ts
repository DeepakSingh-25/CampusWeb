import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampusSession, authMessage } from '../../account/campus-session';
import { CampusSetup, Catalog, CatalogEntry, catalogs } from './catalog-data';

@Component({
  selector:'campus-directory-catalog', imports:[FormsModule],
  templateUrl:'./setup.component.html', styleUrl:'./setup.component.css'
})
export class UserDirectorySetupPage {
  @Input() academicEditor = false;
  readonly session = inject(CampusSession);
  readonly setup = signal<CampusSetup | null>(null);
  readonly loading = signal(false);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly message = signal('');
  readonly statuses = ['All','Active','Inactive'];
  tab: Catalog = catalogs[0];
  status = 'All';
  query = '';
  get tabs() { return this.academicEditor ? catalogs.filter(t => t.academic) : catalogs; }
  get admin() { return this.session.user()?.role === 'Owner / Admin'; }
  get endpoint() { return 'setup/' + (this.academicEditor ? 'attendance' : 'directory'); }
  get editable() { return this.admin && this.tab.academic === this.academicEditor; }
  get entries() { return this.setup()?.entries.filter(e => e.group === this.tab.key) ?? []; }
  get rows() {
    return this.entries.filter(e => this.matches(e,this.status) && e.name.toLowerCase().includes(this.query.trim().toLowerCase()));
  }
  matches(e:CatalogEntry,status:string) { return status === 'All' || e.active === (status === 'Active'); }
  count(status:string) { return this.entries.filter(e => this.matches(e,status)).length; }
  total(tab:Catalog) { return this.setup()?.entries.filter(e => e.group === tab.key).length ?? 0; }
  select(tab:Catalog) { this.tab=tab; this.query=''; this.status='All'; }

  ngOnInit() {
    if (this.academicEditor && location.hash.endsWith('/classes-sections')) this.select(catalogs[1]);
    void this.load();
  }
  async load() {
    this.loading.set(true);
    this.error.set('');
    try { this.setup.set(await this.session.authenticated<CampusSetup>(this.endpoint,'GET')); }
    catch(error) { this.error.set(authMessage(error)); }
    finally { this.loading.set(false); }
  }

  async toggle(entry:CatalogEntry) {
    if (!this.editable || this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.message.set('');
    try {
      const result = await this.session.authenticated<CampusSetup>(this.endpoint+'/catalog/'+entry.key, 'PUT', {active:!entry.active});
      this.setup.update(draft => draft && {...draft, entries:result.entries});
      this.message.set(entry.name + (entry.active ? ' deactivated.' : ' activated.'));
    } catch(error) { this.error.set(authMessage(error)); }
    finally { this.busy.set(false); }
  }

  async save() {
    const draft = this.setup();
    const user = this.session.user();
    if (!draft || user?.role !== 'Owner / Admin' || this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.message.set('');
    try {
      const result = await this.session.authenticated<CampusSetup>(this.endpoint,'PUT',this.academicEditor ? draft.attendance : draft.directory);
      this.setup.set(result);
      this.session.user.update(current => current?.id === user.id && current.companyId === user.companyId
        ? {...current, attendance:result.attendance, directoryView:result.directory.defaultView} : current);
      this.message.set('Settings saved.');
    } catch(error) { this.error.set(authMessage(error)); }
    finally { this.busy.set(false); }
  }
}
