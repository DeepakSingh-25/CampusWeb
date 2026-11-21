import { Component, Input, OnChanges, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { CardHolder } from './card-artwork';
import { CardStyle, fieldNames, renderCard } from './card-artwork';

@Component({selector:'campus-id-preview',imports:[FormsModule],templateUrl:'./id-preview.component.html',styleUrl:'./id-preview.component.css'})
export class IdPreview implements OnChanges {
  @Input({required:true}) cards:CardHolder[]=[];
  @Input() campus='';
  formats=[['CR80','Standard PVC card','85.60 × 53.98 mm · one card per page'],['A4','A4 sheet','210 × 297 mm · CR80 cards tiled'],['A5','A5 sheet','148 × 210 mm · CR80 cards tiled'],['Custom','Custom size','Define width & height in mm']];
  designs=['Classic Gold','Midnight','Minimal','Side Band','Vertical Badge'];
  palette=['#e59700','#ba890b','#16995e','#d73542','#7948dc','#008da4','#cb3482'];
  facultyLabels:Record<string,string>={'Person code':'Employee ID','Class / section':'Designation','Residence':'Campus block','Admission date':'Joining date','Mentor':'Contact'};
  get staffLabels(){return this.student?.kind==='Contractual Staff'?{...this.facultyLabels,'Person code':'Staff ID','Department':'Company','Class / section':'Assigned post'}:this.facultyLabels;}
  get fields(){return this.student?.designation?fieldNames.filter(f=>f!=='Valid until'):fieldNames;}
  shown=new Set(fieldNames);
  format='CR80';orientation='Landscape';design='Classic Gold';accent='#ba890b';
  customW=85.6;customH=53.98;side='Front';zoom=1.5;index=0;
  image=signal('');busy=signal(false);error=signal('');revision=0;
  get student(){return this.cards[this.index];}
  get valid(){return this.format!=='Custom'||[this.customW,this.customH].every(n=>Number.isFinite(n)&&n>=30&&n<=210);}
  get style():CardStyle{
    const w=this.format==='Custom'&&this.valid?this.customW:85.6,h=this.format==='Custom'&&this.valid?this.customH:53.98;
    return {width:this.orientation==='Landscape'?Math.max(w,h):Math.min(w,h),height:this.orientation==='Landscape'?Math.min(w,h):Math.max(w,h),accent:this.accent,design:this.design,fields:new Set(this.shown)};
  }
  get sheet(){return this.format==='A4'?[210,297]:this.format==='A5'?[148,210]:[this.style.width,this.style.height];}
  ngOnChanges(){this.index=0;this.refresh();}
  async refresh(){
    const revision=++this.revision;this.error.set('');
    if(!this.student||!this.valid){this.image.set('');return;}
    const canvas=await renderCard(this.student,this.campus,this.style,this.side==='Rear');
    if(this.revision===revision)this.image.set(canvas.toDataURL());
  }
  toggle(field:string){if(this.shown.has(field))this.shown.delete(field);else this.shown.add(field);this.refresh();}
  async output(side:string,pdf=false){
    if(this.busy()||!this.valid)return;
    const printWindow=pdf?null:window.open('','_blank');
    if(!pdf&&!printWindow){this.error.set('Allow the print window to open, then try again.');return;}
    this.busy.set(true);
    try{
      const style=this.style,[sw,sh]=this.sheet,w=style.width,h=style.height;
      const cols=Math.max(1,Math.floor(sw/w)),rows=Math.max(1,Math.floor(sh/h)),capacity=cols*rows;
      const marginX=(sw-cols*w)/2,marginY=(sh-rows*h)/2;
      const doc=pdf?new (await import('jspdf')).jsPDF({unit:'mm',format:[sw,sh],orientation:sw>sh?'landscape':'portrait',compress:true}):null;
      if(printWindow){
        printWindow.document.title='CampusTrack · ID cards';
        const css=printWindow.document.createElement('style');
        css.textContent='@page{size:'+sw+'mm '+sh+'mm;margin:0}*{box-sizing:border-box}body{margin:0}.sheet{position:relative;width:'+sw+'mm;height:'+sh+'mm;overflow:hidden;break-after:page}.sheet:last-child{break-after:auto}.sheet img{position:absolute}';
        printWindow.document.head.append(css);
      }
      let page=0;
      for(let start=0;start<this.cards.length;start+=capacity){
        for(const face of side==='Both'?['Front','Rear']:[side]){
          const section=printWindow?.document.createElement('section');
          if(section){section.className='sheet';printWindow!.document.body.append(section);}
          if(page++ && doc)doc.addPage();
          const batch=this.cards.slice(start,start+capacity);
          for(const [i,student] of batch.entries()){
            const col=i%cols,y=marginY+Math.floor(i/cols)*h;
            const x=marginX+(side==='Both'&&face==='Rear'?cols-1-col:col)*w;
            const canvas=await renderCard(student,this.campus,style,face==='Rear');
            const image=canvas.toDataURL('image/jpeg',.94);
            if(doc)doc.addImage(image,'JPEG',x,y,w,h);
            if(section){const el=printWindow!.document.createElement('img');el.src=image;el.style.cssText='left:'+x+'mm;top:'+y+'mm;width:'+w+'mm;height:'+h+'mm';section.append(el);await el.decode();}
          }
        }
      }
      if(doc)doc.save('CampusTrack-ID-cards.pdf');
      else if(printWindow){printWindow.focus();printWindow.print();}
    }catch{printWindow?.close();this.error.set('Card output could not be prepared. Please try again.');}
    finally{this.busy.set(false);}
  }
}

