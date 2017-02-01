import { ManterRacaoComponent } from './manter-racao.component';
import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';

export const ManterRacaoRoutes: Route[] = [{
    path: 'manter-racao',
    component: ManterRacaoComponent,
    canActivate: [AuthGuard]
}];
