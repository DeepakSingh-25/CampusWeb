import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdPreview } from './id-preview/id-preview.component';
import { programmes, residences, fees, statuses, records, Student } from './students.data';
import { Pagination, PageWindow } from '../../../shared/pagination/pagination.component';

@Component({selector:'campus-students',imports:[FormsModule,Pagination,IdPreview],templateUrl:'./students.component.html',styleUrls:['../../../shared/module-screen/module-screen.component.css','./students.component.css']})
export class StudentsPage {
  @Input() campus='';
  data=records; programmes=programmes; residences=residences; fees=fees;
  groups=['Total','First year',...statuses,'Hostellers','Fee dues'];
  group='Total'; query=''; programme=''; residence=''; fee=''; advanced=false; grid=true;
  paging=new PageWindow(1,12); checked=new Set<string>(); mode=''; current?:Student; draft?:Student; cards:Student[]=[];
  constructor(){
    try {this.grid=JSON.parse(localStorage.getItem('campustrack.setup.User Directory') || '{}')['Default view']!=='List';} catch {}
  }
  matches(s:Student,g:string){
    switch(g){
      case 'Total':return true; case 'First year':return s.semester<=2;
      case 'Hostellers':return s.residence!=='Day Scholar'; case 'Fee dues':return s.fees!=='Paid';
      default:return s.status===g;
    }
  }
  count(g:string){return records.filter(s=>this.matches(s,g)).length;}
  get rows(){const term=this.query.trim().toLowerCase();return records.filter(s=>this.matches(s,this.group)
    && (!this.programme || s.programme===this.programme) && (!this.residence || s.residence===this.residence)
    && (!this.fee || s.fees===this.fee) && [s.name,s.id,s.programme,'Semester '+s.semester,'Section '+s.section,s.residence,s.mentor].join(' ').toLowerCase().includes(term));}
  reset(){this.group='Total';this.query=this.programme=this.residence=this.fee='';this.paging.page=1;}
  initials(name:string){return name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('');}
  toggle(id:string){if(this.checked.has(id))this.checked.delete(id);else this.checked.add(id);}
  get visibleStudents(){return this.paging.slice(this.rows);}
  get pageChecked(){return this.visibleStudents.every(s=>this.checked.has(s.id));}
  get pageMixed(){return !this.pageChecked && this.visibleStudents.some(s=>this.checked.has(s.id));}
  togglePage(){const remove=this.pageChecked;for(const s of this.visibleStudents){if(remove)this.checked.delete(s.id);else this.checked.add(s.id);}}
  open(mode:string,dialog:HTMLDialogElement,s?:Student){
    this.mode=mode;this.current=s;this.draft=s?{...s}:undefined;
    this.cards=s?[s]:this.checked.size?records.filter(r=>this.checked.has(r.id)):this.rows;
    dialog.showModal();
  }
  save(dialog:HTMLDialogElement){
    if(!this.current || !this.draft)return;
    if(this.mode==='Edit')Object.assign(this.current,this.draft,{name:this.draft.name.trim()});
    else this.current.status=this.mode;
    this.paging.page=1;dialog.close();
  }
}
