import { Lembrete } from './../../../shared/entity/relacionamento/lembrete';
import { LembreteService } from './../../../shared/service/relacionamento/lembrete.service';
import { Component, OnInit, Output, Input, EventEmitter, SimpleChange, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'listar-lembrete',
    templateUrl: './listar-lembrete.component.html',
    providers: [LembreteService]
})

export class ListarLembreteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyLembrete: EventEmitter<any> = new EventEmitter<any>();
    @Input() addLembrete: number;
    lembretes: Lembrete[];

    /**
     * Construtor
     */
    constructor(private lembreteService: LembreteService,//
    ) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarAberto();
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
                this.recuperarAberto();
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
    * onNotifyLembrete()
    */
    public notifyLembreteEmit(lembrete: Lembrete): void {
        this.notifyLembrete.emit(lembrete);
        // this.router.navigate(['/dashboard/cadastrar-cliente', Lembrete.id]);
    }

    public recuperarAberto(): void {
        this.lembreteService.recuperarAberto()
            .subscribe(
            data => {
                this.lembretes = data.objeto;
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
