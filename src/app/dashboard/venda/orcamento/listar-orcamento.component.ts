import { ModalDirective } from 'ng2-bootstrap';
import { VendaService } from './../../../shared/service/venda/venda.service';
import { Router } from '@angular/router';
import { Orcamento } from './../../../shared/entity/venda/orcamento';
import { OrcamentoService } from './../../../shared/service/venda/orcamento.service';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'listar-orcamento',
    templateUrl: './listar-orcamento.component.html',
    providers: [OrcamentoService, VendaService]
})

export class ListarOrcamentoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    @ViewChild('modalFechar') public modalFechar: ModalDirective;
    orcamentos: Orcamento[];
    orcamentoView: Orcamento;
    orcamentoExcluir: Orcamento;
    orcamentoFechar: Orcamento;

    /**
     * Construtor
     */
    constructor(private orcamentoService: OrcamentoService,
        private router: Router,
        private vendaService: VendaService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        console.clear();
        this.orcamentos = [];
        this.recuperarTodos();
    }

    public recuperarTodos(): void {
        this.orcamentoService.recuperarTodos()
            .subscribe(
            data => {
                this.orcamentos = data.objeto;
                this.calcularValorOrcamento();
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

    public calcularValorOrcamento(): void {
        if (this.orcamentos) {
            this.orcamentos.forEach(e => {
                e.itens.forEach(i => {
                    if (!e.valorOrcamento) {
                        e.valorOrcamento = 0;
                    }

                    e.valorOrcamento += i.valorVenda;
                    e.valorDesconto = i.desconto;
                    i.temLote = i.quantidade > 0;
                });
                e.valorOrcamentoSemDesconto = e.valorOrcamento;
                if (e.valorDesconto > 0) {
                    e.valorOrcamento = e.valorOrcamento - ((e.valorDesconto / 100) * e.valorOrcamento);
                }
            });
        }
    }

    public visualizar(orcamento: Orcamento): void {
        this.orcamentoView = orcamento;
    }

    public getPaginaEditar(orcamento: Orcamento): void {
        this.router.navigate(['/dashboard/vender-produto', orcamento.id]);

    }

    public realizarVenda(event: any): void {
        console.log(event);
        event.preventDefault();

        this.vendaService.gravar(this.orcamentoFechar.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarTodos();
                this.orcamentoView = null;
                this.modalFechar.hide();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
                this.modalFechar.hide();
            });

    }

    public showModalExcluir(orcamento: Orcamento): void {
        this.orcamentoExcluir = orcamento;
        this.modalExcluir.show();
    }

    public excluir(event: any): void {
        event.preventDefault();
        this.orcamentoService.excluir(this.orcamentoExcluir.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.modalExcluir.hide();
                this.recuperarTodos();
                this.orcamentoView = null;
                this.orcamentoExcluir = null;
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
                this.modalExcluir.hide();
            });

    }

    public showModalFecharPedido(orcamento: Orcamento): void {
        this.orcamentoFechar = orcamento;
        this.modalFechar.show();
    }
}
