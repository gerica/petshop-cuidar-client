import { Route } from '@angular/router';
import { LoginComponent } from './index';

export const LoginRoutes: Route[] = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'login/:desc',
		component: LoginComponent
	}
];
