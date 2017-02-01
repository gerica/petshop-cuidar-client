import { AuthGuard } from './../../common/auth.guard';
import { Route } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutes: Route[] = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'home/:desc',
		component: HomeComponent
	}
];
