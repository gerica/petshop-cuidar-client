import { URL_INCLUIR_USUARIO } from './../../../shared/service/usuario.service';
import { RacaoLoteComponent } from './racao-lote.component';
import { ModalDirective } from 'ngx-bootstrap';
import { RacaoService } from './../../../shared/service/produto/racao.service';
import { TipoPetService } from './../../../shared/service/pet/tipo-pet.service';
import { TipoPet } from './../../../shared/entity/pet/tipoPet';
import { Racao } from './../../../shared/entity/produto/racao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'manter-racao',
    templateUrl: './manter-racao.component.html',
    providers: [TipoPetService, RacaoService]
})

export class ManterRacaoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    racao: Racao;
    tiposPet: TipoPet[];
    linhas: string[];
    portes: string[];
    idades: string[];
    addRacao: number = 0;
    @ViewChild('modalExcluir') 
    modalExcluir: ModalDirective;
    @ViewChild(RacaoLoteComponent) 
    racaoLoteComponent: RacaoLoteComponent;
    racaoExcluir: Racao;

    /**
     * Construtor
     */
    constructor(private tipoPetService: TipoPetService,
        private racaoService: RacaoService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.racao = new Racao();
        this.recuperarTodosTipoPet();
        this.recuperarTodasLinhaRacao();
        this.recuperarTodasPorte();
        this.recuperarTodasFaixaIdade();

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.racao = new Racao();        
        this.racaoLoteComponent.inicialListaLote();
    }

    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }

    public onNotifyRacao(racao: Racao): void {
        this.racao = racao;
        this.tiposPet.forEach((e) => {
            if (e.id === this.racao.tipoPet.id) {
                this.racao.tipoPet = e;
            }
        });
    }

    /**
     * Grava
     */
    public gravar(event: any): void {
        event.preventDefault();
        this.racaoService.gravar(this.racao)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addRacao++;
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });

    }

    public excluir(event: any): void {
        event.preventDefault();
        this.racaoService.excluir(this.racaoExcluir.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addRacao++;
                this.modalExcluir.hide();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
        this.modalExcluir.hide();
    }

    public recuperarTodosTipoPet(): void {
        this.tipoPetService.recuperarTodosTipoPet()
            .subscribe(
            data => {
                this.tiposPet = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public recuperarTodasLinhaRacao(): void {
        this.racaoService.recuperarTodasLinhaRacao()
            .subscribe(
            data => {
                this.linhas = data.objeto;
                // console.log(data.objeto);
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public recuperarTodasFaixaIdade(): void {
        this.racaoService.recuperarTodasFaixaIdade()
            .subscribe(
            data => {
                this.idades = data.objeto;
                // console.log(data.objeto);
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public recuperarTodasPorte(): void {
        this.racaoService.recuperarTodasPorte()
            .subscribe(
            data => {
                this.portes = data.objeto;
                // console.log(data.objeto);
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public showModalExcluir(): void {
        this.racaoExcluir = this.racao;
        this.modalExcluir.show();
    }

}
