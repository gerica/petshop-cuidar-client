import { FiltroPorUsuario } from './pipes/usuario.pipe';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';


import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';

@NgModule({
    imports: [SharedModule, Ng2PaginationModule],
    declarations: [CadastrarUsuarioComponent, FiltroPorUsuario],
    exports: [CadastrarUsuarioComponent]
})

export class CadastrarUsuarioModule { }
