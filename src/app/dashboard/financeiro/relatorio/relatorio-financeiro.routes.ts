import { AuthGuard } from './../../../common/auth.guard';
import { Route } from '@angular/router';
import { RelatorioFinanceiroComponent } from './index';

export const RelatorioFinanceiroRoutes: Route[] = [{
    path: 'relatorio-financeiro',
    component: RelatorioFinanceiroComponent,
    canActivate: [AuthGuard]
},];
