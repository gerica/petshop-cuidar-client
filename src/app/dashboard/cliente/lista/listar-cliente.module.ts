import { SharedModule } from './../../../shared/shared.module';
import { FiltroPorCliente } from './../pipes/cliente.pipe';
import { NgModule } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination'; // <-- import the module


import { ListarClienteComponent } from './listar-cliente.component';

@NgModule({
    imports: [
        SharedModule,
        Ng2PaginationModule,

    ],
    declarations: [ListarClienteComponent, FiltroPorCliente],
    exports: [ListarClienteComponent]
})

export class ListarClienteModule { }
