import { FiltroPorClienteLembrete } from './../pipes/lemrete.pipe';
import { ListarLembreteComponent } from './listar-lembrete.component';
import { ManterLembreteComponent } from './manter-lembrete.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [SharedModule,
        TextMaskModule,
        Ng2PaginationModule],
    declarations: [ManterLembreteComponent,
        ListarLembreteComponent,
        FiltroPorClienteLembrete],
    exports: [ManterLembreteComponent]
})

export class ManterLembreteModule { }
