import { PrimeiroLoginRoutes } from './primeiro-login/primeiro-login.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';
import { SignupRoutes } from './signup/signup.routes';
import { LoginComponent } from './login/login.component';
import { LoginRoutes } from './login/login.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    ...LoginRoutes,
    ...SignupRoutes,
    ...DashboardRoutes,
    ...PrimeiroLoginRoutes,
    { path: '**', component: LoginComponent }
];
