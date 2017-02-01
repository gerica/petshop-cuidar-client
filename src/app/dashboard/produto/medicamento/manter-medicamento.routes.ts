import { ManterMedicamentoComponent } from './manter-medicamento.component';
import { Route } from '@angular/router';
import { AuthGuard } from './../../../common/auth.guard';

export const ManterMedicamentoRoutes: Route[] = [{
    path: 'manter-medicamento',
    component: ManterMedicamentoComponent,
    canActivate: [AuthGuard]
}];
