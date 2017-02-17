import { RacaoLoteService } from './../../../shared/service/produto/racao-lote.service';
import { RacaoLote } from './../../../shared/entity/produto/racao-lote';
import { Racao } from './../../../shared/entity/produto/racao';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, ViewChild, SimpleChange } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'tab-racao-lote',
    templateUrl: './racao-lote.component.html',
    providers: [RacaoLoteService]
})

export class RacaoLoteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() racao: Racao;
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    activeForm: boolean = true;

    racaoLote: RacaoLote;
    racaoLoteExcluir: RacaoLote;
    racaoLotes: RacaoLote[];

    /**
     * Construtor
     */
    constructor(private racaoLoteService: RacaoLoteService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.racaoLote = new RacaoLote();
    }

    /**
     * Método que é chamado toda vez que o objeto com @Input sofrer alguma alteração.
     * Nesse caso o objeto é: pessoa
     */
    public ngOnChanges(changes: {
        [propKey: string]: SimpleChange
    }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let to = JSON.stringify(changedProp.currentValue);
            this.racao = JSON.parse(to);
            if (this.racao && this.racao.id) {
                this.recuperarPorRacaoId(this.racao.id);
            }

        };
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.racaoLote = new RacaoLote();        
    }

    public inicialListaLote(): void {
        this.racaoLotes = [];
    }

    public gravar(event: any): void {
        event.preventDefault();
        this.racaoLoteService.gravar(this.racaoLote, this.racao.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorRacaoId(this.racao.id);
                this.novo();
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }

    public excluir(event: any): void {
        event.preventDefault();
        this.racaoLoteService.excluir(this.racaoLoteExcluir.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorRacaoId(this.racao.id);
                this.novo();
                this.modalExcluir.hide();
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
        this.modalExcluir.hide();
    }

    public recuperarPorRacaoId(idRacao: number): void {
        this.racaoLoteService.recuperarPorRacaoId(idRacao)
            .subscribe(
            data => {
                this.racaoLotes = data.objeto;
            },
            error => {
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public carregarParaEdicao(racaoLote: RacaoLote): void {
        this.racaoLote = racaoLote;
    }

    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * onNotifyAlerta()
     */
    public notifyAlertaEmit(message: any) {
        this.notifyAlerta.emit(message);
    }

    public showModalExcluir(): void {
        this.racaoLoteExcluir = this.racaoLote;
        this.modalExcluir.show();
    }

}
