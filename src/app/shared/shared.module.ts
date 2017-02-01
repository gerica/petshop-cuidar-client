import { TypeAheadProdutoComponent } from './component/typeahead-produto.component';
import { UtilsService } from './service/utils.service';
import { TypeAheadClienteComponent } from './component/typeahead-cliente.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    AlertModule,
    ButtonsModule,
    DropdownModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TooltipModule,
    ModalModule,
    TypeaheadModule
} from 'ng2-bootstrap';

import { InputMaskCurrentDirective } from '../shared/directive/input-mask-current.directive';

@NgModule({
    imports: [CommonModule,
        RouterModule,
        FormsModule,
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        DropdownModule.forRoot(),
        PaginationModule.forRoot(),
        ProgressbarModule.forRoot(),
        RatingModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        TypeaheadModule.forRoot()],
    declarations: [InputMaskCurrentDirective,
        TypeAheadClienteComponent,
        TypeAheadProdutoComponent],
    exports: [CommonModule,
        AlertModule,
        ButtonsModule,
        DropdownModule,
        PaginationModule,
        ProgressbarModule,
        RatingModule,
        TabsModule,
        TooltipModule,
        ModalModule,
        TypeaheadModule,
        FormsModule,
        RouterModule,
        InputMaskCurrentDirective,
        ReactiveFormsModule,
        TypeAheadClienteComponent,
        TypeAheadProdutoComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [UtilsService]
        };
    }
}
