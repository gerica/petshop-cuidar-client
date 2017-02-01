import { TipoDocumento } from './../../../shared/entity/pessoa/tipo-documento';
import { TipoDocumentoService } from './../../../shared/service/pessoa/tipo-documento.service';
import { Documento } from './../../../shared/entity/pessoa/documento';
import { DocumentoService } from './../../../shared/service/pessoa/documento.service';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'tab-documento-cliente',
    templateUrl: './documento-cliente.component.html',
    providers: [DocumentoService, TipoDocumentoService]
})

export class DocumentoClienteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() pessoa: Pessoa;
    @ViewChild('modalExcluirDocumento') public modalExcluirDocumento: ModalDirective;
    activeForm: boolean = true;

    // Dados para a aba ENDEREÇO
    documento: Documento;
    documentoExcluir: Documento;
    documentos: Documento[];
    tiposDocumento: TipoDocumento[];
    maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    /**
     * Construtor
     */
    constructor(private documentoService: DocumentoService,
        private tipoDocumentoService: TipoDocumentoService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.documento = new Documento();
        this.recuperarTodosTipoDocumento();
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
                this.recuperarDocumentoPorPessoaId(this.pessoa.id);
            }

        };
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.documento = new Documento();
    }

    public gravar(event: any): void {
        event.preventDefault();
        this.documentoService.gravar(this.documento, this.pessoa.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarDocumentoPorPessoaId(this.pessoa.id);
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
        this.documentoService.excluir(this.documentoExcluir.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarDocumentoPorPessoaId(this.pessoa.id);
                this.novo();
                this.modalExcluirDocumento.hide();
            },
            err => {
                // Log errors if any
                this.notifyAlertaEmit({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
        this.modalExcluirDocumento.hide();
    }

    public recuperarDocumentoPorPessoaId(idPessoa: number): void {
        this.documentoService.recuperarDocumentoPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.documentos = data.objeto;
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

    public recuperarTodosTipoDocumento(): void {
        this.tipoDocumentoService.recuperarTodosTipoDocumento()
            .subscribe(
            data => {
                this.tiposDocumento = data.objeto;
                this.carregarTipoPessoaJuridica();
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


    public carregarParaEdicao(documento: Documento): void {
        this.documento = documento;
        this.tiposDocumento.forEach((e: TipoDocumento) => {
            if (e.id === this.documento.tipoDocumento.id) {
                this.documento.tipoDocumento = e;
            }

        });
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
        this.documentoExcluir = this.documento;
        this.modalExcluirDocumento.show();
    }

    public onChange(td: TipoDocumento) {
        this.documento.numero = null;
    }

    public carregarTipoPessoaJuridica(): void {
        if (this.pessoa.tipoPessoa === 'JURÍDICA') {
            this.tiposDocumento.forEach((e: TipoDocumento) => {
                if (e.descricao === 'CNPJ') {
                    this.documento.tipoDocumento = e;
                }

            });

            for (var i = this.tiposDocumento.length - 1; i >= 0; i--) {
                if (this.tiposDocumento[i].descricao !== 'CNPJ') {
                    this.tiposDocumento.splice(i, 1);
                }
            }
        } else {
            for (var i = this.tiposDocumento.length - 1; i >= 0; i--) {
                if (this.tiposDocumento[i].descricao === 'CNPJ') {
                    this.tiposDocumento.splice(i, 1);
                }
            }
        }

    }
}
