import { MedicamentoLoteService } from './../../../shared/service/produto/medicamento-lote.service';
import { MedicamentoLote } from './../../../shared/entity/produto/medicamento-lote';
import { Medicamento } from './../../../shared/entity/produto/medicamento';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, ViewChild, SimpleChange } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'tab-medicamento-lote',
    templateUrl: './medicamento-lote.component.html',
    providers: [MedicamentoLoteService]
})

export class MedicamentoLoteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() medicamento: Medicamento;
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    activeForm: boolean = true;

    medicamentoLote: MedicamentoLote;
    medicamentoLoteExcluir: MedicamentoLote;
    medicamentoLotes: MedicamentoLote[];

    /**
     * Construtor
     */
    constructor(private medicamentoLoteService: MedicamentoLoteService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.medicamentoLote = new MedicamentoLote();
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
            this.medicamento = JSON.parse(to);
            if (this.medicamento && this.medicamento.id) {
                this.recuperarPorMedicamentoId(this.medicamento.id);
            }

        };
    }

    public inicialLista(): void {
        this.medicamentoLotes = [];
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.medicamentoLote = new MedicamentoLote();

    }

    public gravar(event: any): void {
        event.preventDefault();
        this.medicamentoLoteService.gravar(this.medicamentoLote, this.medicamento.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorMedicamentoId(this.medicamento.id);
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
        this.medicamentoLoteService.excluir(this.medicamentoLoteExcluir.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorMedicamentoId(this.medicamento.id);
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

    public recuperarPorMedicamentoId(idMedicamento: number): void {
        this.medicamentoLoteService.recuperarPorMedicamentoId(idMedicamento)
            .subscribe(
            data => {
                this.medicamentoLotes = data.objeto;
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

    public carregarParaEdicao(medicamentoLote: MedicamentoLote): void {
        this.medicamentoLote = medicamentoLote;
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
        this.medicamentoLoteExcluir = this.medicamentoLote;
        this.modalExcluir.show();
    }

}
