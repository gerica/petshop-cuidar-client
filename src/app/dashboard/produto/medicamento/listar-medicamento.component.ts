import { Medicamento } from './../../../shared/entity/produto/medicamento';
import { MedicamentoService } from './../../../shared/service/produto/medicamento.service';
import { Component, OnInit, Output, Input, EventEmitter, SimpleChange, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'listar-medicamento',
    templateUrl: './listar-medicamento.component.html',
    providers: [MedicamentoService]
})

export class ListarMedicamentoComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyMedicamento: EventEmitter<any> = new EventEmitter<any>();
    @Input() addMedicamento: number;
    medicamentos: Medicamento[];

    /**
     * Construtor
     */
    constructor(private medicamentoService: MedicamentoService,//
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
    * onNotifyMedicamento()
    */
    public notifyMedicamentoEmit(medicamento: Medicamento): void {
        this.notifyMedicamento.emit(medicamento);
        // this.router.navigate(['/dashboard/cadastrar-cliente', medicamento.id]);
    }

    public recuperarTodas(): void {
        this.medicamentoService.recuperarTodas()
            .subscribe(
            data => {
                this.medicamentos = data.objeto;
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
