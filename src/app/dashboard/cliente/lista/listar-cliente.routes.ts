import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';
import { ListarClienteComponent } from './index';

export const ListarClienteRoutes: Route[] = [{
    path: 'listar-cliente',
    component: ListarClienteComponent,
    canActivate: [AuthGuard]
}, ];
