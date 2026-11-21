import { Component, Input } from '@angular/core';
import { stats, widgets } from '../../data/catalog';

const attentionColors = ['#cc4163', '#536da4', '#ba7721', '#118577', '#8646b0', '#397eae', '#bd5c37', '#657582'];
const attendanceColors = ['#168457', '#cc4163', '#9753bf', '#138d9d', '#537bc3', '#bd7621', '#657582', '#a69b87', '#877887'];

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
  widgets = widgets.map(widget => ({
    ...widget,
    chart: widget.title === 'Needs Attention' ? donut(widget.values, attentionColors, 'Open items')
      : widget.title === 'Daily Attendance' ? donut(widget.values, attendanceColors, 'Marked') : null
  }));
}
