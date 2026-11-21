import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageWindow, Pagination } from '../pagination/pagination.component';
import { reportSources, screens, setupValues, Screen } from '../../data/screens';

@Component({selector:'campus-module-screen',imports:[FormsModule, Pagination],templateUrl:'./module-screen.component.html',styleUrl:'./module-screen.component.css'})
export class ModuleScreen implements OnChanges {
  @Input({required:true}) moduleName = '';
  @Input({required:true}) section = '';
  @Input() icon = '';
  source: Screen = {fields:[],rows:[]};
  query = '';
  filter = '';
  grid = false;
  settings: Record<string,string> = {};
  settingFields: string[] = [];
  message = '';
  report = '';
  reports: string[] = [];
  selected: string[] = [];
  paging = new PageWindow();
  get key(){return 'campustrack.setup.'+this.moduleName;}
  ngOnChanges(){
    this.query=''; this.filter=''; this.message=''; this.selected=[];
    this.reports=reportSources[this.moduleName] || [];
    this.report=this.reports[0] || '';
    this.settings={...setupValues[this.moduleName]};
    try {Object.assign(this.settings,JSON.parse(localStorage.getItem(this.key) || '{}'));} catch {}
    this.settingFields=Object.keys(setupValues[this.moduleName] || {});
    this.loadScreen();
  }
  loadScreen(){
    this.paging.page=1;
    this.source=screens[this.moduleName]?.[this.section==='Reports'?this.report:this.section] || {fields:[],rows:[]};
    this.grid=!!this.source.grid && this.section!=='Reports';
    if(this.moduleName==='User Directory')this.grid=this.settings['Default view']!=='List';
    this.filter=''; this.query='';
  }
  get lastField(){return this.source.fields[this.source.fields.length-1];}
  get choices(){return [...new Set(this.source.rows.map(row=>row[row.length-1]))];}
  get rows(){
    const term=this.query.trim().toLowerCase();
    return this.source.rows.filter(row=>(!this.filter || row[row.length-1]===this.filter) && row.some(v=>v.toLowerCase().includes(term)));
  }
  initials(name:string){return name.replace(/^Dr\. /,'').split(' ').slice(0,2).map(part=>part[0]).join('');}
  save(){localStorage.setItem(this.key,JSON.stringify(this.settings));this.message='Settings saved on this device.';}
  exportReport(){
    const lines=[this.source.fields,...this.rows].map(row=>row.map(value=>'"'+value.replaceAll('"','""')+'"').join(','));
    const url=URL.createObjectURL(new Blob(['\uFEFF',lines.join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download=this.moduleName+' - '+this.report+'.csv';anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}

