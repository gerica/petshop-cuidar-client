import { FiltroPorMedicamentoLote } from './../pipes/medicamento-lote.pipe';
import { MedicamentoLoteComponent } from './medicamento-lote.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FiltroPorMedicamento } from './../pipes/medicamento.pipe';
import { ListarMedicamentoComponent } from './listar-medicamento.component';
import { ManterMedicamentoComponent } from './manter-medicamento.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [SharedModule,
        TextMaskModule,
        Ng2PaginationModule],
    declarations: [ManterMedicamentoComponent,
        ListarMedicamentoComponent,
        FiltroPorMedicamento,
        MedicamentoLoteComponent,
        FiltroPorMedicamentoLote],
    exports: [ManterMedicamentoComponent]
})

export class ManterMedicamentoModule { }
