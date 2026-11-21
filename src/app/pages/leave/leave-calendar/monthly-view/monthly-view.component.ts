import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { LeaveCalendar } from '../leave-calendar.component';

@Component({
  selector:'campus-monthly-view',
  templateUrl:'./monthly-view.component.html',
  styleUrl:'../leave-calendar.component.css',
  changeDetection:ChangeDetectionStrategy.Eager
})
export class MonthlyView {
  @Input({required:true}) calendar!: LeaveCalendar;
}
