import { AgendaComponent } from './agenda.component';
import { AuthGuard } from './../../common/auth.guard';
import { Route } from '@angular/router';

export const AgendaRoutes: Route[] = [
	{
		path: 'agenda',
		component: AgendaComponent,
		canActivate: [AuthGuard]
	}
];
