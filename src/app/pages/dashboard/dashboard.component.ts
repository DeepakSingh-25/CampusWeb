import { Component, computed, HostListener, inject, Input, signal } from '@angular/core';
import { CampusSession, authMessage } from '../account/campus-session';
import { stats, widgets } from '../../data/catalog';

const attentionColors = ['#cc4163', '#536da4', '#ba7721', '#118577', '#8646b0', '#397eae', '#bd5c37', '#657582'];
const attendanceColors = ['#168457', '#cc4163', '#9753bf', '#138d9d', '#537bc3', '#bd7621', '#657582', '#a69b87', '#877887'];

interface AttendanceSummary {
  day: string;
  marked: number;
  absent: number;
  percentage: number | null;
  breakdown: {code: string; meaning: string; count: number}[];
}

function donut(values: number[], colors: string[], caption: string) {
  const total = values.reduce((sum, value) => sum + value, 0);
  let end = 0;
  const stops = values.flatMap((value, i) => {
    if (!value) return [];
    const start = end;
    end += 100 * value / total;
    return [colors[i] + ' ' + start + '% ' + end + '%'];
  });
  return { total, caption, colors, fill: total ? 'conic-gradient(' + stops.join(', ') + ')' : 'var(--border-color)' };
}

@Component({
  selector: 'campus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardPage {
  @Input({required:true}) moduleLink!: (name:string)=>string;
  stats = stats;
  private readonly session = inject(CampusSession);
  readonly summary = signal<AttendanceSummary | null>(null);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly registerLink = '#/attendance/student-attendance';
  readonly attendanceChart = computed(() => {
    const rows = this.summary()?.breakdown ?? [];
    return donut(rows.map(r => r.count), rows.map((_,i) => attendanceColors[i % attendanceColors.length]), 'Students marked');
  });
  ngOnInit(){void this.loadAttendance();}
  @HostListener('window:focus')
  async loadAttendance(){
    if(this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    try {
      this.summary.set(await this.session.authenticated<AttendanceSummary>('attendance/today','GET'));
    } catch(error) {
      this.summary.set(null);
      this.error.set(authMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
  widgets = widgets.map(widget => ({
    ...widget,
    chart: widget.title === 'Needs Attention' ? donut(widget.values, attentionColors, 'Open items') : null
  }));
}
