import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';
import { CadastrarClienteComponent } from './index';

export const CadastrarClienteRoutes: Route[] = [{
    path: 'cadastrar-cliente',
    component: CadastrarClienteComponent,
    canActivate: [AuthGuard]
}, {
    path: 'cadastrar-cliente/:idPessoa',
    component: CadastrarClienteComponent,
    canActivate: [AuthGuard]
}];
