import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { LeaveCalendar } from '../leave-calendar.component';

@Component({
  selector:'campus-yearly-view',
  templateUrl:'./yearly-view.component.html',
  styleUrl:'../leave-calendar.component.css',
  changeDetection:ChangeDetectionStrategy.Eager
})
export class YearlyView {
  @Input({required:true}) calendar!: LeaveCalendar;
}
