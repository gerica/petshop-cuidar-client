import { FiltroPorRacaoLote } from './../pipes/racao-lote.pipe';
import { RacaoLoteComponent } from './racao-lote.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FiltroPorRacao } from './../pipes/racao.pipe';
import { ListarRacaoComponent } from './listar-racao.component';
import { ManterRacaoComponent } from './manter-racao.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [SharedModule,
        TextMaskModule,
        Ng2PaginationModule],
    declarations: [ManterRacaoComponent,
        ListarRacaoComponent,
        FiltroPorRacao,
        RacaoLoteComponent,
        FiltroPorRacaoLote],
    exports: [ManterRacaoComponent]
})

export class ManterRacaoModule { }
