import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet, withHashLocation } from '@angular/router';
import { CampusApp } from './app/app.component';
import { authGuard } from './app/pages/account/auth.guard';
import { SignedOut } from './app/pages/account/signed-out/signed-out.component';

@Component({selector: 'app-root', imports: [RouterOutlet], template: '<router-outlet />'})
class Root {}

bootstrapApplication(Root, {providers: [provideRouter([
  {path: 'login', component: SignedOut, title: 'Sign in · CampusTrack'},
  {path: 'account/signed-out', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: CampusApp, canActivate: [authGuard], runGuardsAndResolvers: 'always'}
], withHashLocation())]}).catch(error => console.error(error));
