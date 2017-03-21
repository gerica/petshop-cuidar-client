import { VendaService } from './../../../shared/service/venda/venda.service';
import { ActivatedRoute } from '@angular/router';
import { Orcamento } from './../../../shared/entity/venda/orcamento';
import { OrcamentoService } from './../../../shared/service/venda/orcamento.service';
import { ItemVenda } from './../../../shared/entity/produto/item-venda';
import { ProdutoService } from './../../../shared/service/produto/produto.service';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'form-vender-produto',
    templateUrl: './vender-produto.component.html',
    providers: [ProdutoService, OrcamentoService, VendaService]
})

export class VenderProdutoComponent implements OnInit, OnDestroy {
    /*Variaveis*/
    private subscription: Subscription;
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    // clienteControl: FormControl = new FormControl();
    vendaForm: FormGroup;
    cliente: Pessoa;
    itensVenda: ItemVenda[];
    totalVenda: number = 0;
    desconto: number = 0;
    orcamento: Orcamento;

    /**
     * Construtor
     */
    constructor(private produtoService: ProdutoService,
        private fb: FormBuilder,
        private orcamentoService: OrcamentoService,
        private route: ActivatedRoute,
        private vendaService: VendaService) {
        this.vendaForm = fb.group({
            quantidadeVenda: [''],
            desconto: ['']
        });

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        console.clear();
        this.itensVenda = [];
        this.orcamento = new Orcamento();
        this.subscription = this.route.params.subscribe(params => {
            if (params && params['idOrcamento']) {
                this.recuperarOrcamentoPorId(params['idOrcamento']);
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.itensVenda = [];
        this.totalVenda = 0;
        this.cliente = null;
        this.orcamento = new Orcamento();
        if (this.alertaUtil.alerts) {
            this.alertaUtil.closeAlert(this.alertaUtil.alerts.length - 1);
        }
        this.desconto = 0;
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        if (this.validarFormulario()) {
            this.retirarItemSemLote();
            this.atribuirDesconto();
            this.orcamentoService.gravar(this.orcamento, this.cliente, this.itensVenda)
                .subscribe(
                result => {
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                    this.orcamento = result.objeto;
                    // this.novo();
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message === undefined ? err : err.message
                    });
                });
        } else {
            this.alertaUtil.addMessage({
                type: 'warning',
                closable: true,
                msg: 'Informe o cliente e os produtos.'
            });
        }
    }

    public validarFormulario(): boolean {
        return !!this.cliente && this.itensVenda.length > 0;
    }

    public onSelectedCliene(cliente: Pessoa): void {
        this.cliente = cliente;
        // console.log('Cliente: ', this.cliente);
    }

    public onSelectedProduto(produto: any): void {
        this.recuperarLotePorIdProduto(produto);
    }

    public recuperarLotePorIdProduto(produto: any): void {
        if (this.verificarItemAdicionado(produto)) {
            this.produtoService.recuperarLotePorIdProduto(produto.id, produto.tipoProduto)
                .subscribe(
                data => {
                    this.createItemVenda(produto, data.objeto);
                    this.calcularTotalVenda();
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message === undefined ? err : err.message
                    });
                }
                );
        } else {
            this.alertaUtil.addMessage({
                type: 'warning',
                closable: true,
                msg: 'Produto: ' + produto.nome + ', já adicionado.'
            });
        }
    }

    public recuperarOrcamentoPorId(idOrcamento: number): void {
        this.orcamentoService.recuperarPorOrcamentoId(idOrcamento)
            .subscribe(
            data => {
                this.orcamento = data.objeto;
                this.carregarTelaEdicao();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            }
            );
    }

    public verificarItemAdicionado(produto: any): boolean {
        if (this.itensVenda) {
            for (var x = 0; x < this.itensVenda.length; x++) {
                if (produto.id === this.itensVenda[x].idProduto) {
                    return false;
                }
            }
        }
        return true;

    }

    public createItemVenda(produto: any, lote: any[]): void {
        let itemVenda: ItemVenda = new ItemVenda();
        //dados do produto
        itemVenda.idProduto = produto.id;
        itemVenda.marca = produto.marca;
        itemVenda.nome = produto.nome;
        itemVenda.tipoProduto = produto.tipoProduto;

        // dados do lote
        console.log(lote);
        if (this.validarLote(lote)) {
            console.log(lote[0]);
            itemVenda.temLote = true;
            itemVenda.numero = lote[0].numero;
            itemVenda.dataLote = lote[0].dataLote;
            itemVenda.dataValidade = lote[0].dataValidade;
            itemVenda.valor = lote[0].valor;
            itemVenda.valorVenda = lote[0].valorVenda;
            itemVenda.quantidade = lote[0].quantidade;
            itemVenda.quantidadeVenda = 1;
        }
        itemVenda.desconto = 0;
        this.itensVenda.push(itemVenda);
    }

    public removerItem(index: number): void {
        this.itensVenda.splice(index, 1);
    }

    public adicionarItemVenda(index: number): void {
        this.itensVenda[index].quantidadeVenda++;
        this.calcularTotalVenda();
    }
    public subtrairItemVenda(index: number): void {
        if (this.itensVenda[index].quantidadeVenda > 0) {
            this.itensVenda[index].quantidadeVenda--;
            this.calcularTotalVenda();
        }

    }

    public showHideColuna(item: ItemVenda): void {
        item.showDetalhe = !item.showDetalhe;
    }

    public calcularTotalVenda(): void {
        this.totalVenda = 0;
        this.itensVenda.forEach((e) => {
            if (e.quantidadeVenda && e.valorVenda) {
                this.totalVenda += e.quantidadeVenda * e.valorVenda;
                e.valorVenda = e.quantidadeVenda * e.valorVenda;
            }
        });
        this.calcularDesconto();
    }

    public calcularDesconto(): void {
        if (this.desconto > 0) {
            this.totalVenda = this.totalVenda - ((this.desconto / 100) * this.totalVenda);
        }
    }

    public retirarItemSemLote(): void {
        if (this.itensVenda) {
            let temp: ItemVenda[] = [];
            for (var x = 0; x < this.itensVenda.length; x++) {
                if (this.itensVenda[x].temLote) {
                    temp.push(this.itensVenda[x]);
                }
            }
            this.itensVenda = temp;
        }
    }

    public atribuirDesconto(): void {
        if (this.itensVenda !== undefined && this.itensVenda.length > 0) {
            this.itensVenda.forEach(i => i.desconto = this.desconto);
        }
    }

    public carregarTelaEdicao(): void {
        if (this.orcamento) {
            this.cliente = this.orcamento.pessoa;
            this.itensVenda = this.orcamento.itens;
            this.itensVenda.forEach(e => {
                e.temLote = true;
                this.desconto = e.desconto;
            });

            this.calcularTotalVenda();
        }

    }

    public realizarVenda(): void {
        if (this.validarFormulario()) {
            this.retirarItemSemLote();
            this.vendaService.gravar(this.orcamento.id)
                .subscribe(
                result => {
                    this.novo();
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                    console.log(result.objeto);
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message === undefined ? err : err.message
                    });
                });
        } else {
            this.alertaUtil.addMessage({
                type: 'warning',
                closable: true,
                msg: 'Informe o cliente e os produtos.'
            });
        }
    }

    private validarLote(lote: any[]): boolean {
        let retorno = false;
        if (lote.length > 0) {
            for (let l of lote) {
                if (l.quantidade > 0) {
                    retorno = true;
                    break;
                }
            }
        }
        return retorno;
    }

}
