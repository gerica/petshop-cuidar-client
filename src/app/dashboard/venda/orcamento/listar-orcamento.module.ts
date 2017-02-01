import { FiltroPorClienteOrcamento } from './../pipes/orcamento-cliente.pipe';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ListarOrcamentoComponent } from './listar-orcamento.component';

@NgModule({
    imports: [SharedModule, Ng2PaginationModule],
    declarations: [ListarOrcamentoComponent, FiltroPorClienteOrcamento],
    exports: [ListarOrcamentoComponent]
})

export class ListarOrcamentoModule { }
