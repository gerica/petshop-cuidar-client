import { PetClienteComponent } from './pet-cliente.component';
import { SharedModule } from './../../../shared/shared.module';
import { DocumentoClienteComponent } from './documento-cliente.component';
import { TelefoneClienteComponent } from './telefone-cliente.component';
import { EnderecoClienteComponent } from './endereco-cliente.component';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';



import { CadastrarClienteComponent } from './cadastrar-cliente.component';

@NgModule({
    imports: [SharedModule, TextMaskModule],
    declarations: [CadastrarClienteComponent,
        EnderecoClienteComponent,
        TelefoneClienteComponent,
        DocumentoClienteComponent,
        PetClienteComponent],
    exports: [CadastrarClienteComponent]
})

export class CadastrarClienteModule { }
