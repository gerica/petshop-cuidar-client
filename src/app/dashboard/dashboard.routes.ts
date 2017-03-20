import { AgendaRoutes } from './agenda/agenda.routes';
import { AuthGuard } from './../common/auth.guard';
import { RelatorioFinanceiroRoutes } from './financeiro/relatorio/relatorio-financeiro.routes';
import { ManterLembreteRoutes } from './relacionamento/lembrete/manter-lembrete.routes';
import { ListarOrcamentoRoutes } from './venda/orcamento/listar-orcamento.routes';
import { ManterMedicamentoRoutes } from './produto/medicamento/manter-medicamento.routes';
import { ManterRacaoRoutes } from './produto/racao/manter-racao.routes';
import { ListarClienteRoutes } from './cliente/lista/listar-cliente.routes';
import { VenderProdutoRoutes } from './produto/venda/vender-produto.routes';
import { Route } from '@angular/router';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { DashboardComponent } from './index';
import { CadastrarUsuarioRoutes } from './cadastrar-usuario/index';
import { CadastrarClienteRoutes } from './cliente/cadastro/cadastrar-cliente.routes';

export const DashboardRoutes: Route[] = [{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        ...HomeRoutes,
        ...BlankPageRoutes,
        ...CadastrarUsuarioRoutes,
        ...CadastrarClienteRoutes,
        ...VenderProdutoRoutes,
        ...ListarClienteRoutes,
        ...ManterRacaoRoutes,
        ...ManterMedicamentoRoutes,
        ...ListarOrcamentoRoutes,
        ...ManterLembreteRoutes,
        ...RelatorioFinanceiroRoutes,
        ...AgendaRoutes
    ],
    canActivate: [AuthGuard]
}];
