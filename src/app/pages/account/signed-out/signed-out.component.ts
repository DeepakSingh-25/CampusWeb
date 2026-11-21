import { Component } from '@angular/core';

@Component({
  selector: 'campus-signed-out',
  templateUrl: './signed-out.component.html'
})
export class SignedOut {
  signIn() {
    sessionStorage.removeItem('campus.signedOut');
    location.hash = '/dashboard';
  }
}
