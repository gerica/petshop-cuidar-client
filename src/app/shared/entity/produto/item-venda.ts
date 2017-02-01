export class ItemVenda {
    //Dados Produto
    idProduto: number;
    idProdutoCliente: number;
    marca: string;
    nome: string;
    tipoProduto: string;

    // Dados Lote
    numero: number;
    dataLote: Date;
    dataValidade: Date;
    valor: number;
    valorVenda: number;
    quantidade: number;

    //Dados Venda
    quantidadeVenda: number;
    dataVenda: Date;
    desconto: number;

    //Dados para tela
    showDetalhe: boolean = false;
    temLote: boolean = false;
}
