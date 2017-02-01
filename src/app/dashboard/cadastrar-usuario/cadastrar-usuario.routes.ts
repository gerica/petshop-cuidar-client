import { Route } from '@angular/router';
import { AuthGuard } from '../../common/auth.guard';
import { CadastrarUsuarioComponent } from './index';

export const CadastrarUsuarioRoutes: Route[] = [{
    path: 'cadastrar-usuario',
    component: CadastrarUsuarioComponent,
    canActivate: [AuthGuard]
}];
