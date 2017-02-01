import { Telefone } from './../../../shared/entity/pessoa/telefone';
import { TelefoneService } from './../../../shared/service/pessoa/telefone.service';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'tab-telefone-cliente',
    templateUrl: './telefone-cliente.component.html',
    providers: [TelefoneService]
})

export class TelefoneClienteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() pessoa: Pessoa;
    @ViewChild('modalExcluirTelefone') public modalExcluirTelefone: ModalDirective;
    activeForm: boolean = true;

    // Dados para a aba ENDEREÇO
    telefone: Telefone;
    telefoneExcluir: Telefone;
    telefones: Telefone[];
    maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    /**
     * Construtor
     */
    constructor(private telefoneService: TelefoneService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.telefone = new Telefone();
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
            this.pessoa = JSON.parse(to);
            if (this.pessoa) {
                this.recuperarTelefonePorPessoaId(this.pessoa.id);
            }

        };
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.telefone = new Telefone();
    }

    public gravar(event: any): void {
        event.preventDefault();
        this.telefoneService.gravar(this.telefone, this.pessoa.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarTelefonePorPessoaId(this.pessoa.id);
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
        this.telefoneService.excluir(this.telefoneExcluir.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarTelefonePorPessoaId(this.pessoa.id);
                this.novo();
                this.modalExcluirTelefone.hide();
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
        this.modalExcluirTelefone.hide();
    }

    public recuperarTelefonePorPessoaId(idPessoa: number): void {
        this.telefoneService.recuperarTelefonePorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.telefones = data.objeto;
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

    public carregarParaEdicaoTelefone(telefone: Telefone): void {
        this.telefone = telefone;
    }

    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * OperacaoInvestimentoComponent.onNotifyAlerta()
     */
    public notifyAlertaEmit(message: any) {
        this.notifyAlerta.emit(message);
    }

    public showModalExcluir(): void {
        this.telefoneExcluir = this.telefone;
        this.modalExcluirTelefone.show();
    }
}
