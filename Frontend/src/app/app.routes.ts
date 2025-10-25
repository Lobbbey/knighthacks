import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Auth } from './auth/auth';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
];
