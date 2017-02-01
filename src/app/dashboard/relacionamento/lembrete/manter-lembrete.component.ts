import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { Lembrete } from './../../../shared/entity/relacionamento/lembrete';
import { LembreteService } from './../../../shared/service/relacionamento/lembrete.service';
import { ModalDirective } from 'ng2-bootstrap';
import { TipoPetService } from './../../../shared/service/pet/tipo-pet.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';

@Component({
    moduleId: module.id,
    selector: 'manter-lembrete',
    templateUrl: './manter-lembrete.component.html',
    providers: [TipoPetService, LembreteService]
})

export class ManterLembreteComponent implements OnInit {
    /*Variaveis*/
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    lembrete: Lembrete;
    cliente: Pessoa;
    addLembrete: number = 0;
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    lembreteExcluir: Lembrete;
    strLembrete: string;

    /**
     * Construtor
     */
    constructor(private tipoPetService: TipoPetService,
        private lembreteService: LembreteService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.lembrete = new Lembrete();
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.lembrete = new Lembrete();
        this.strLembrete = '';
    }

    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }

    public onNotifyLembrete(lembrete: Lembrete): void {
        this.lembrete = lembrete;
    }

    /**
     * Grava
     */
    public gravar(event: any): void {
        event.preventDefault();
        if (this.validarFormulario()) {
            this.atribuirData();
            this.lembreteService.gravar(this.lembrete, this.cliente.id)
                .subscribe(
                result => {
                    this.alertaUtil.addMessage({
                        type: 'success',
                        closable: true,
                        msg: result.message
                    });
                    this.novo();
                    this.addLembrete++;
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
            // Log errors if any
            this.alertaUtil.addMessage({
                type: 'warning',
                closable: true,
                msg: 'O cliente é campo obrigatório, por favor informe.'
            });
        }

    }

    public excluir(event: any): void {
        event.preventDefault();
        this.lembreteService.excluir(this.lembreteExcluir.id)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
                this.addLembrete++;
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

    public showModalExcluir(): void {
        this.lembreteExcluir = this.lembrete;
        this.modalExcluir.show();
    }

    public onSelectedCliene(cliente: Pessoa): void {
        this.cliente = cliente;
        console.log('Cliente: ', this.cliente);
    }

    public calcularDtLembrete(lembrarEm: string) {
        console.log(lembrarEm);
        let data = this.adicionarDiasDataLembrete(lembrarEm);
        let ano = data.toLocaleDateString().substring(6, 10);
        let mes = data.toLocaleDateString().substring(3, 5);
        let dia = data.toLocaleDateString().substring(0, 2);
        this.strLembrete = ano + '-' + mes + '-' + dia;
    }

    private adicionarDiasDataLembrete(lembrarEm: string): Date {
        let valor = 0;
        let tipo = '';

        switch (lembrarEm) {
            case ('1s'):
                valor = 7;
                tipo = 'semana';
                break;
            case ('2s'):
                valor = 14;
                tipo = 'semana';
                break;
            case ('3s'):
                valor = 21;
                tipo = 'semana';
                break;
            case ('1m'):
                valor = 1;
                tipo = 'mes';
                break;
            case ('3m'):
                valor = 3;
                tipo = 'mes';
                break;
            case ('6m'):
                valor = 6;
                tipo = 'mes';
                break;
            case ('1a'):
                valor = 1;
                tipo = 'ano';
                break;
        }

        let data = new Date();
        if (tipo === 'semana') {
            data.setTime(data.getTime() + valor * (24 * 60 * 60 * 1000)); // adds weeks to the date
        } else if (tipo === 'mes') {
            data.setMonth(data.getMonth() + valor);
        } else if (tipo === 'ano') {
            data.setFullYear(data.getFullYear() + valor);
        }
        return data;
    }

    private atribuirData(): void {
        let e: any[] = this.strLembrete.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        let dataLocal = new Date();
        dataLocal.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        this.lembrete.dtLembrete = dataLocal;
    }

    private validarFormulario(): boolean {
        if (this.cliente) {
            return true;
        }
        return false;
    }

}
