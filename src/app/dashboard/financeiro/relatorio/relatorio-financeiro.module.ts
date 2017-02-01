import { RelatorioFinanceiroComponent } from './relatorio-financeiro.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [SharedModule, Ng2PaginationModule],
    declarations: [RelatorioFinanceiroComponent],
    exports: [RelatorioFinanceiroComponent]
})

export class RelatorioFinanceiroModule { }
