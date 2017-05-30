import { MedicamentoLoteComponent } from './medicamento-lote.component';
import { MedicamentoLote } from './../../../shared/entity/produto/medicamento-lote';
import { ModalDirective } from 'ngx-bootstrap';
import { MedicamentoService } from './../../../shared/service/produto/medicamento.service';
import { TipoPetService } from './../../../shared/service/pet/tipo-pet.service';
import { TipoPet } from './../../../shared/entity/pet/tipoPet';
import { Medicamento } from './../../../shared/entity/produto/medicamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'manter-medicamento',
    templateUrl: './manter-medicamento.component.html',
    providers: [TipoPetService, MedicamentoService]
})

export class ManterMedicamentoComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    medicamento: Medicamento;
    tiposPet: TipoPet[];
    tiposPetSelected: TipoPet[];
    categorias: string[];
    portes: string[];
    idades: string[];
    addMedicamento: number = 0;
    @ViewChild('modalExcluir')
    modalExcluir: ModalDirective;
    @ViewChild(MedicamentoLoteComponent)
    medicamentoLoteComponent: MedicamentoLoteComponent;
    medicamentoExcluir: Medicamento;

    /**
     * Construtor
     */
    constructor(private tipoPetService: TipoPetService,
        private medicamentoService: MedicamentoService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.medicamento = new Medicamento();
        this.recuperarTodosTipoPet();
        this.recuperarTodasLinhaMedicamento();
        this.recuperarTodasPorte();
        this.recuperarTodasFaixaIdade();

    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.medicamento = new Medicamento();
        this.medicamentoLoteComponent.inicialLista();
    }

    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }

    public onNotifyMedicamento(medicamento: Medicamento): void {
        this.medicamento = medicamento;
        this.tiposPetSelected = [];
        this.tiposPet.forEach((tipo) => {
            this.medicamento.medicamentoTipoPet.forEach((medTipo) => {
                if (tipo.dsNome === medTipo.tipoPet.dsNome) {
                    this.tiposPetSelected.push(tipo);
                }
            });
        });
    }

    /**
     * Grava
     */
    public gravar(event: any): void {
        event.preventDefault();
        this.medicamentoService.gravar(this.medicamento, this.tiposPetSelected)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addMedicamento++;
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
        this.medicamentoService.excluir(this.medicamentoExcluir.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addMedicamento++;
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

    public recuperarTodasLinhaMedicamento(): void {
        this.medicamentoService.recuperarTodasCategoria()
            .subscribe(
            data => {
                this.categorias = data.objeto;
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
        this.medicamentoService.recuperarTodasFaixaIdade()
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
        this.medicamentoService.recuperarTodasPorte()
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
        this.medicamentoExcluir = this.medicamento;
        this.modalExcluir.show();
    }

}
