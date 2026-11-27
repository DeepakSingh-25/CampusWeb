import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModuleScreen } from '../../../shared/module-screen/module-screen.component';
import { CampusSession, authMessage } from '../../account/campus-session';

type Kind = 'branch' | 'department' | 'designation';
interface Unit {
  id: string;
  kind: Kind;
  name: string;
  parentId: string | null;
  code: string | null;
  location: string | null;
  head: string | null;
  staffCategory: string | null;
  isActive: boolean;
}

const pages = {
  branch: {section: 'Branches', fields: ['Branch','Code','Location','Status']},
  department: {section: 'Departments', fields: ['Department','Code','Branch','Head']},
  designation: {section: 'Designations', fields: ['Designation','Staff category','Department','Status']}
};

@Component({
  selector: 'campus-organization', imports: [FormsModule, ModuleScreen],
  templateUrl: './organization.component.html'
})
export class OrganizationPage {
  readonly kind = input.required<Kind>();
  readonly session = inject(CampusSession);
  readonly units = signal<Unit[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal('');
  readonly saveError = signal('');
  readonly saving = signal(false);
  readonly notice = signal('');
  readonly draft = signal<Unit | null>(null);
  readonly page = computed(() => pages[this.kind()]);
  readonly admin = computed(() => this.session.user()?.role === 'Owner / Admin');
  readonly records = computed(() => this.units().filter(u => u.kind === this.kind()));
  readonly byId = computed(() => new Map(this.units().map(u => [u.id, u])));
  readonly parents = computed(() => this.units().filter(u =>
    u.kind === (this.kind() === 'department' ? 'branch' : 'department')));
  readonly table = computed(() => ({
    fields: this.page().fields,
    rows: this.records().map(u => {
      const status = u.isActive ? 'Active' : 'Inactive';
      const parent = this.byId().get(u.parentId || '');
      switch (u.kind) {
        case 'branch': return [u.name, u.code || '', u.location || '', status];
        case 'department': return [u.name, u.code || '', parent?.name || '', u.head || '—'];
        case 'designation': return [u.name, u.staffCategory || '', parent?.name || '', status];
      }
    })
  }));
  private readonly endpoint = 'settings/organization';

  ngOnInit() { void this.load(); }

  async load() {
    this.loading.set(true);
    this.loadError.set('');
    try {
      this.units.set(await this.session.authenticated<Unit[]>(this.endpoint, 'GET'));
    } catch (error) { this.loadError.set(authMessage(error)); }
    finally { this.loading.set(false); }
  }

  parentLabel(parent: Unit) {
    const branch = this.byId().get(parent.parentId || '');
    return [branch && (branch.name + ' (' + branch.code + ')'), parent.name + ' (' + parent.code + ')'].filter(Boolean).join(' / ');
  }

  edit(row?: string[]) {
    const unit = row && this.records()[this.table().rows.indexOf(row)];
    this.saveError.set('');
    this.notice.set('');
    this.draft.set(unit ? {...unit} : {id:'', kind:this.kind(), name:'', parentId:null,
      code:'', location:'', head:'', staffCategory:'', isActive:true});
  }

  async save() {
    const unit = this.draft();
    if (!unit || this.saving() || !this.admin()) return;
    this.saving.set(true);
    this.saveError.set('');
    try {
      const {id, ...body} = unit;
      const saved = await this.session.authenticated<Unit>(this.endpoint + (id ? '/' + id : ''), id ? 'PUT' : 'POST', body);
      this.units.update(rows => [...rows.filter(r => r.id !== saved.id), saved].sort((a,b) => a.name.localeCompare(b.name)));
      this.draft.set(null);
      this.notice.set(saved.name + ' saved.');
    } catch (error) { this.saveError.set(authMessage(error)); }
    finally { this.saving.set(false); }
  }
}
