import { AuthGuard } from './../../../common/auth.guard';
import { Route } from '@angular/router';
import { VenderProdutoComponent } from './index';

export const VenderProdutoRoutes: Route[] = [{
    path: 'vender-produto',
    component: VenderProdutoComponent,
    canActivate: [AuthGuard]
}, {
    path: 'vender-produto/:idOrcamento',
    component: VenderProdutoComponent,
    canActivate: [AuthGuard]
}];
