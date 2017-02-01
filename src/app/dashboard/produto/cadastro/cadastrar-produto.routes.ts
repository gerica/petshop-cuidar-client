import { CadastrarProdutoComponent } from './cadastrar-produto.component';
import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';

export const CadastrarProdutoRoutes: Route[] = [{
    path: 'cadastrar-produto',
    component: CadastrarProdutoComponent,
    canActivate: [AuthGuard]
}];
