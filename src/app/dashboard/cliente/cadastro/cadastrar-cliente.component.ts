import { Raca } from './../../../shared/entity/pet/raca';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { UtilsService } from './../../../shared/service/utils.service';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { Subscription } from 'rxjs/Rx';


@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-cliente.component.html',
    providers: [PessoaService]
})

export class CadastrarClienteComponent implements OnInit, OnDestroy {
    /*Variaveis*/
    private subscription: Subscription;
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeClienteForm: boolean = true;
    activeEnderecoForm: boolean = true;
    pessoa: Pessoa;
    pessoaDtNascimento: string;    

    /**
     * Construtor
     */
    constructor(private utilsService: UtilsService,//
        private pessoaService: PessoaService,//
        private route: ActivatedRoute) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.pessoa = new Pessoa();
        this.subscription = this.route.params.subscribe(params => {
            if (params && params['idPessoa']) {
                this.recuperarPessoaPorId(params['idPessoa']);
            }
        });

    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public novo() {
        this.activeClienteForm = false;
        setTimeout(() => this.activeClienteForm = true, 0);
        this.pessoa = new Pessoa();
    }


    /**
     * Grava novo cliente
     */
    public gravar(event: any): void {
        event.preventDefault();
        this.atribuirDtNascimento();

        this.pessoaService.gravar(this.pessoa)
            .subscribe(
            result => {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.pessoa = result.objeto;
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
    }
    public recuperarPessoaPorId(idPessoa: number): void {
        this.pessoaService.recuperarPessoaPorId(idPessoa)
            .subscribe(
            data => {
                this.pessoa = data.objeto;
                this.parseDtNascimento();
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

    public parseDtNascimento(): void {
        let dataLocal = new Date(this.pessoa.dtNascimento);
        let ano = dataLocal.toLocaleDateString().substring(6, 10);
        let mes = dataLocal.toLocaleDateString().substring(3, 5);
        let dia = dataLocal.toLocaleDateString().substring(0, 2);
        this.pessoaDtNascimento = ano + '-' + mes + '-' + dia;
    }

    public onNotifyAlerta(message: any): void {
        this.alertaUtil.addMessage(message);
    }

    private atribuirDtNascimento() {
        let e: any[] = this.pessoaDtNascimento.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        let dataLocal = new Date();
        dataLocal.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        this.pessoa.dtNascimento = dataLocal;
    }

}
