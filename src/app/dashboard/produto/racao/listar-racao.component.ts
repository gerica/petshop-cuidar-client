import { Racao } from './../../../shared/entity/produto/racao';
import { RacaoService } from './../../../shared/service/produto/racao.service';
import { Component, OnInit, Output, Input, EventEmitter, SimpleChange, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'listar-racao',
    templateUrl: './listar-racao.component.html',
    providers: [RacaoService]
})

export class ListarRacaoComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyRacao: EventEmitter<any> = new EventEmitter<any>();
    @Input() addRacao: number;
    racoes: Racao[];

    /**
     * Construtor
     */
    constructor(private racaoService: RacaoService,//
    ) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarTodas();
    }

    /*Métodos*/
    /**
     * Método que é chamado toda vez que o objeto com @Input sofrer alguma alteração.
     * Nesse caso o objeto é: atualizarListaEntradas
     */
    public ngOnChanges(changes: {
        [propKey: string]: SimpleChange
    }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let from = JSON.stringify(changedProp.previousValue);
            let to = JSON.stringify(changedProp.currentValue);
            if (from !== to) {
                this.recuperarTodas();
                break;
            }

        };
    }

    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * onNotifyAlerta()
     */
    public notifyAlertaEmit(message: any) {
        this.notifyAlerta.emit(message);
    }

    /**
    * Método que quando acionado chamará um método no componente pai. 
    * Nesse caso chamará
    * onNotifyRacao()
    */
    public notifyRacaoEmit(racao: Racao): void {
        this.notifyRacao.emit(racao);
        // this.router.navigate(['/dashboard/cadastrar-cliente', racao.id]);
    }

    public recuperarTodas(): void {
        this.racaoService.recuperarTodas()
            .subscribe(
            data => {
                this.racoes = data.objeto;
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
}
