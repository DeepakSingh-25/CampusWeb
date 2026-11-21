import { cards } from './catalog';

export interface Screen { fields: string[]; rows: string[][]; grid?: boolean }
export function screen(fields: string, ...records: string[]): Screen {
  return {fields: fields.split('|'), rows: records.map(line => line.split('|'))};
}
export function catalog(fields: string, group: string): Screen {
  return {...screen(fields), rows: cards[group], grid: true};
}
export function leaves(person:string, name:string, second:string) {
  return screen(person+'|Leave type|From|Until|Approver|Status',
    name+'|Casual leave|20 Nov 2026|21 Nov 2026|Reporting officer|Pending',
    second+'|Medical leave|16 Nov 2026|18 Nov 2026|Department head|Approved');
}
