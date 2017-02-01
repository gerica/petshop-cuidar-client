import { AuthGuard } from './../../../common/auth.guard';
import { Route } from '@angular/router';
import { ListarOrcamentoComponent } from './index';

export const ListarOrcamentoRoutes: Route[] = [{
    path: 'listar-orcamento',
    component: ListarOrcamentoComponent,
    canActivate: [AuthGuard]
}, ];
