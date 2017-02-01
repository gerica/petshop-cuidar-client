import { ProdutoNomePipe } from './../pipes/produto-nome.pipe';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { VenderProdutoComponent } from './vender-produto.component';

@NgModule({
    imports: [SharedModule],
    declarations: [VenderProdutoComponent, ProdutoNomePipe],
    exports: [VenderProdutoComponent]
})

export class VenderProdutoModule { }
