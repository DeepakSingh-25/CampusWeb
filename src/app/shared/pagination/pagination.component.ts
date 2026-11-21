import { Component, EventEmitter, Input, Output } from '@angular/core';

export class PageWindow {
  constructor(public page = 1, public size = 5){}
  get start(){ return (this.page - 1) * this.size; }
  slice<T>(items: T[]){ return items.slice(this.start, this.start + this.size); }
}

@Component({
  selector: 'campus-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class Pagination {
  @Input({required:true}) total = 0;
  @Input() noun = 'records';
  @Input({required:true}) window!: PageWindow;
  @Output() windowChange = new EventEmitter<PageWindow>();
  sizes = [5, 10, 12, 25, 50];
  get numbers(){
    const count=Math.min(5,this.pages);
    const first=Math.max(1,Math.min(this.window.page-2,this.pages-count+1));
    return Array.from({length:count},(_,i)=>first+i);
  }
  get pages(){return Math.ceil(this.total / this.window.size);}
  get end(){return Math.min(this.window.start + this.window.size, this.total);}
  go(page:number){this.windowChange.emit(new PageWindow(page,this.window.size));}
  resize(event:Event){this.windowChange.emit(new PageWindow(1,Number((event.target as HTMLSelectElement).value)));}
}
