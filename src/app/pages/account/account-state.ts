import { signal } from '@angular/core';

export const accountName = signal(localStorage.getItem('campus.account.name') || 'Manish Kumar');
export const accountEmail = signal(localStorage.getItem('campus.account.email') || 'manish@creadent.in');
export function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}
