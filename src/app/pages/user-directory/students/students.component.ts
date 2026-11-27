import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampusSession, authMessage } from '../../account/campus-session';
import { IdPreview } from './id-preview/id-preview.component';
import type { CampusSetup } from '../setup/catalog-data';
import { Pagination, PageWindow } from '../../../shared/pagination/pagination.component';

interface Student {
  key: string; id: string; revision: string; name: string; programme: string; semester: number;
  section: string; admitted: string; blood: string; residence: string; fees: string; mentor: string; status: string;
}
@Component({selector:'campus-students',imports:[FormsModule,Pagination,IdPreview],templateUrl:'./students.component.html',styleUrls:['../../../shared/module-screen/module-screen.component.css','./students.component.css']})
export class StudentsPage {
  @Input() campus='';
  readonly session = inject(CampusSession);
  readonly data = signal<Student[]>([]);
  readonly setup = signal<CampusSetup | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly saving = signal(false);
  readonly saveError = signal('');
  readonly notice = signal('');
  readonly fees = ['Paid','Part paid','Overdue'];
  readonly groups=['Total','First year','On Roll','Provisional','On Long Leave','Passed Out','TC Issued','Hostellers','Fee dues'];
  group='Total'; query=''; programme=''; residence=''; fee=''; advanced=false;
  grid=this.session.user()?.directoryView !== 'List';
  paging=new PageWindow(1,12); checked=new Set<string>(); mode=''; current?:Student; draft?:Student;
  cards:(Student & {photo:number})[]=[]; suffix='';
  get admin(){return this.session.user()?.role==='Owner / Admin';}
  get programmes(){return [...new Set(this.data().map(s=>s.programme))].sort();}
  get residences(){return [...new Set(this.data().map(s=>s.residence))].sort();}
  ngOnInit(){void this.load();}
  async load(){
    this.loading.set(true);this.error.set('');
    try {
      const students=await this.session.authenticated<Student[]>('students','GET');
      this.data.set(students);
      this.checked.clear();
    } catch(e){this.error.set(authMessage(e));}
    finally{this.loading.set(false);}
  }
  choices(group:string){return this.setup()?.entries.filter(e=>e.group===group && e.active).map(e=>e.name) ?? [];}
  get sections(){
    const prefix=this.draft?.programme+' · Section ';
    return this.choices('classes-sections').filter(s=>s.startsWith(prefix)).map(s=>s.slice(prefix.length));
  }
  matches(s:Student,g:string){
    switch(g){
      case 'Total':return true; case 'First year':return s.semester<=2;
      case 'Hostellers':return s.residence!=='Day Scholar'; case 'Fee dues':return s.fees!=='Paid';
      default:return s.status===g;
    }
  }
  count(g:string){return this.data().filter(s=>this.matches(s,g)).length;}
  get rows(){const term=this.query.trim().toLowerCase();return this.data().filter(s=>this.matches(s,this.group)
    && (!this.programme || s.programme===this.programme) && (!this.residence || s.residence===this.residence)
    && (!this.fee || s.fees===this.fee) && [s.name,s.id,s.programme,'Semester '+s.semester,'Section '+s.section,s.residence,s.mentor].join(' ').toLowerCase().includes(term));}
  reset(){this.group='Total';this.query=this.programme=this.residence=this.fee='';this.paging.page=1;}
  initials(name:string){return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('');}
  toggle(id:string){if(this.checked.has(id))this.checked.delete(id);else this.checked.add(id);}
  get visibleStudents(){return this.paging.slice(this.rows);}
  get pageChecked(){return this.visibleStudents.length>0 && this.visibleStudents.every(s=>this.checked.has(s.id));}
  get pageMixed(){return !this.pageChecked && this.visibleStudents.some(s=>this.checked.has(s.id));}
  togglePage(){const remove=this.pageChecked;for(const s of this.visibleStudents){if(remove)this.checked.delete(s.id);else this.checked.add(s.id);}}
  open(mode:string,dialog:HTMLDialogElement,s?:Student){
    this.mode=mode;this.current=s;this.draft=s?{...s}:undefined;
    this.saveError.set('');
    this.cards=mode==='ID cards' ? (s?[s]:this.checked.size?this.data().filter(r=>this.checked.has(r.id)):this.rows).map(r=>({...r,photo:0})) : [];
    if(!dialog.open)dialog.showModal();
  }
  async admit(dialog:HTMLDialogElement){
    this.open('Add',dialog);
    this.suffix='';this.setup.set(null);
    this.draft={key:'',id:'',revision:'',name:'',programme:'',section:'',semester:1,blood:'',mentor:'',fees:'Paid',
      residence:'Day Scholar',admitted:'',status:'On Roll'};
    await this.loadChoices();
  }
  async loadChoices(){
    this.saveError.set('');
    try {this.setup.set(await this.session.authenticated<CampusSetup>('setup/directory','GET'));}
    catch(e){this.saveError.set(authMessage(e));}
  }
  async save(dialog:HTMLDialogElement){
    const s=this.draft;
    if(!this.admin || !s || this.saving())return;
    this.saving.set(true);this.saveError.set('');
    try {
      let saved:Student;
      if(this.mode==='Add'){
        const {name,programme,section,semester,admitted,blood,mentor,fees,residence,status}=s;
        saved=await this.session.authenticated<Student>('students','POST',{suffix:this.suffix.trim(),name,programme,section,semester,admitted,blood,mentor,fees,residence,status});
      }else{
        const edit=this.mode==='Edit';
        const body=edit?{revision:s.revision,name:s.name,residence:s.residence,fees:s.fees}:{revision:s.revision,status:this.mode};
        saved=await this.session.authenticated<Student>('students/'+s.key+(edit?'':'/status'),'PUT',body);
      }
      this.data.update(rows=>[...rows.filter(r=>r.key!==saved.key),saved].sort((a,b)=>a.name.localeCompare(b.name)||a.id.localeCompare(b.id)));
      if(this.mode==='Add')this.reset();
      this.paging.page=1;this.notice.set(saved.name+' · '+saved.id+' saved.');dialog.close();
    }catch(e){this.saveError.set(authMessage(e));}
    finally{this.saving.set(false);}
  }
}
