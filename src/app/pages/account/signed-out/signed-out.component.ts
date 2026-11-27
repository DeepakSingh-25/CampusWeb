import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampusSession, authMessage } from '../campus-session';

@Component({
  selector: 'campus-signed-out',
  templateUrl: './signed-out.component.html',
  styleUrl: './signed-out.component.css'
})
export class SignedOut {
  readonly session = inject(CampusSession);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly busy = signal(false);
  readonly message = signal('');
  readonly challenge = signal<{id: string; sentTo?: string} | null>(null);
  private remember = false;

  private async enterCampus() {
    const path = this.route.snapshot.queryParamMap.get('returnUrl');
    await this.router.navigateByUrl(path?.startsWith('/') && !path.startsWith('//') && !path.startsWith('/login') ? path : '/dashboard', {replaceUrl: true});
  }

  async retrySession() {
    this.busy.set(true);
    try {
      await this.session.restore();
      if (this.session.user()) await this.enterCampus();
    } finally {
      this.busy.set(false);
    }
  }

  async submit(form: HTMLFormElement) {
    if (this.busy()) return;
    this.busy.set(true);
    this.message.set('');
    const fields = new FormData(form);
    try {
      const otp = this.challenge();
      if (otp) {
        const result = await this.session.verify(otp.id, String(fields.get('code')), this.remember);
        if (result.status !== 'Success') {
          this.message.set(result.status === 'Expired' ? 'Code expired. Sign in again to request a code.' : 'Incorrect verification code.');
          return;
        }
      } else {
        this.remember = fields.has('remember');
        const result = await this.session.login(String(fields.get('userId')), String(fields.get('password')), this.remember);
        if (result.status === 'OTPRequired' && result.otpId) {
          this.challenge.set({id: result.otpId, sentTo: result.sentTo});
          return;
        }
        if (result.status !== 'Success') throw new Error('Sign-in could not be completed.');
      }
      await this.session.restore();
      if (!this.session.user()) this.message.set('Could not confirm your session. Please sign in again.');
      else await this.enterCampus();
    } catch (error) {
      this.message.set(authMessage(error));
    } finally {
      this.busy.set(false);
    }
  }
}
