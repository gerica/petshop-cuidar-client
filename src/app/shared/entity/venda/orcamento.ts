import { ItemVenda } from './../produto/item-venda';
import { ProdutoCliente } from './produtoCliente';
import { Usuario } from './../authority/usuario';
import { Pessoa } from './../pessoa/pessoa';

export class Orcamento {
    id: number;
    pessoa: Pessoa;
    usuario: Usuario;
    produtos: ProdutoCliente[];
    dtOrcamento: Date;

    //Dados para Tela
    itens: ItemVenda[];
    valorOrcamento: number = 0;
    valorOrcamentoSemDesconto: number = 0;
    valorDesconto: number = 0;    
}
