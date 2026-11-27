import { Injectable, signal } from '@angular/core';

export interface CampusUser {
  id: string;
  companyId: string | null;
  fullName: string;
  email: string;
  role: string;
  mobileNo: string | null;
  companyName: string | null;
  emailVerified: boolean;
  directoryView: 'Grid' | 'List' | null;
  attendance: {workingDayStart: string; workingDayEnd: string; graceMinutes: number} | null;
  lastLoginOn: string | null;
  passwordChangedOn: string | null;
}

class AuthError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

async function apiRequest<T>(path: string, method: 'GET' | 'PUT' | 'POST', body?: unknown): Promise<T> {
  const res = await fetch('/api/' + path, {
    method, credentials: 'same-origin', cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const envelope = await res.json().catch(() => null);
  if (!res.ok) throw new AuthError(res.status, envelope?.error || 'The request failed. Please try again.');
  if (!envelope || !('response' in envelope)) throw new Error('Campus API returned an unexpected response.');
  return envelope.response;
}

function request<T>(endpoint: string, method: 'GET' | 'POST', body?: unknown) {
  return apiRequest<T>('auth/' + endpoint, method, body);
}

export function authMessage(error: unknown) {
  return error instanceof Error && !(error instanceof TypeError) ? error.message : 'Cannot reach Campus API. Please try again.';
}

@Injectable({providedIn: 'root'})
export class CampusSession {
  readonly user = signal<CampusUser | null>(null);
  readonly checking = signal(true);
  readonly error = signal('');
  readonly loggingOut = signal(false);
  private pending?: Promise<void>;

  async authenticated<T>(path: string, method: 'GET' | 'PUT' | 'POST', body?: unknown): Promise<T> {
    const before = this.user();
    try {
      return await apiRequest<T>(path, method, body);
    } catch (error) {
      if (!(error instanceof AuthError && error.status === 401)) throw error;
      await this.restore();
      const after = this.user();
      if (!after) {
        location.hash = '/login?returnUrl=' + encodeURIComponent(location.hash.slice(1));
        throw error;
      }
      if (after.id !== before?.id || after.companyId !== before.companyId)
        throw new Error('Your account changed. Reload the page to continue.');
      return apiRequest<T>(path, method, body);
    }
  }

  login(userId: string, password: string, rememberMe: boolean) {
    return request<{status: string; otpId?: string; sentTo?: string}>('login', 'POST', {userId, password, rememberMe});
  }

  verify(otpId: string, otpValue: string, rememberMe: boolean) {
    return request<{status: string}>('verify-otp', 'POST', {otpId, otpValue, rememberMe});
  }

  restore() {
    if (!this.pending && !this.loggingOut()) {
      this.pending = this.load().finally(() => { this.pending = undefined; });
    }
    return this.pending;
  }

  private async load() {
    this.error.set('');
    try {
      let profile: CampusUser;
      try {
        profile = await request<CampusUser>('me', 'GET');
      } catch (error) {
        if (!(error instanceof AuthError && error.status === 401)) throw error;
        await request('refresh', 'POST');
        profile = await request<CampusUser>('me', 'GET');
      }
      this.user.set(profile);
    } catch (error) {
      this.user.set(null);
      if (!(error instanceof AuthError && error.status === 401)) this.error.set(authMessage(error));
    } finally {
      this.checking.set(false);
    }
  }

  async logout() {
    if (this.loggingOut()) return;
    this.loggingOut.set(true);
    try {
      await this.pending;
      await request('logout', 'POST');
      this.user.set(null);
      this.error.set('');
      location.hash = '/account/signed-out';
    } catch (error) {
      this.error.set(authMessage(error));
    } finally {
      this.loggingOut.set(false);
    }
  }
}
