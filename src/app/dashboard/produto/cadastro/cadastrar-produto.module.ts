import { CadastrarProdutoComponent } from './cadastrar-produto.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [SharedModule, TextMaskModule],
    declarations: [CadastrarProdutoComponent],
    exports: [CadastrarProdutoComponent]
})

export class CadastrarProdutoModule { }
