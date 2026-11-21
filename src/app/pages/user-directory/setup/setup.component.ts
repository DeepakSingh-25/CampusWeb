import { ModuleScreen } from '../../../shared/module-screen/module-screen.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Catalog, CatalogEntry, catalogs } from './catalog-data';

@Component({
  selector:'campus-directory-catalog',
  imports:[FormsModule, ModuleScreen],
  templateUrl:'./setup.component.html',
  styleUrl:'./setup.component.css'
})
export class UserDirectorySetupPage implements OnInit {
  @Input() academicEditor=false;
  tabs=catalogs;
  tab=catalogs[0];
  entries:CatalogEntry[]=[];
  status='All';
  query='';
  statuses=['All','Active','Inactive'];
  ngOnInit(){
    if(this.academicEditor)this.tabs=catalogs.filter(t=>t.academic);
    this.select(this.academicEditor && location.hash.endsWith('/classes-sections')?catalogs[1]:this.tabs[0]);
  }
  select(tab:Catalog){
    this.tab=tab; this.query=''; this.status='All';
    let inactive:string[]=[];
    try{inactive=JSON.parse(localStorage.getItem(this.key)||'[]');}catch{}
    this.entries=tab.names.map((name,i)=>({id:String(i),name,active:!inactive.includes(String(i))}));
  }
  get key(){return 'campustrack.catalog.inactive.'+this.tab.title;}
  get editable(){return this.academicEditor||!this.tab.academic;}
  count(status:string){return this.entries.filter(e=>this.matches(e,status)).length;}
  matches(e:CatalogEntry,status:string){return status==='All'||e.active===(status==='Active');}
  get rows(){return this.entries.filter(e=>this.matches(e,this.status)&&e.name.toLowerCase().includes(this.query.trim().toLowerCase()));}
  toggle(e:CatalogEntry){if(this.editable){e.active=!e.active;localStorage.setItem(this.key,JSON.stringify(this.entries.filter(r=>!r.active).map(r=>r.id)));}}
}