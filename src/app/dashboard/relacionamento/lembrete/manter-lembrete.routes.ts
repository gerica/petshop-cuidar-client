import { ManterLembreteComponent } from './manter-lembrete.component';
import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';

export const ManterLembreteRoutes: Route[] = [{
    path: 'manter-lembrete',
    component: ManterLembreteComponent,
    canActivate: [AuthGuard]
}];
