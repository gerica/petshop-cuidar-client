import { PetService } from './../../../shared/service/pet/pet.service';
import { Pet } from './../../../shared/entity/pet/pet';
import { DocumentoService } from './../../../shared/service/pessoa/documento.service';
import { Documento } from './../../../shared/entity/pessoa/documento';
import { UtilsService } from './../../../shared/service/utils.service';
import { Telefone } from './../../../shared/entity/pessoa/telefone';
import { TelefoneService } from './../../../shared/service/pessoa/telefone.service';
import { EnderecoService } from './../../../shared/service/pessoa/endereco.service';
import { Endereco } from './../../../shared/entity/pessoa/endereco';
import { Router } from '@angular/router';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { PessoaService } from './../../../shared/service/pessoa/pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './listar-cliente.component.html',
    providers: [UtilsService,
        PessoaService,
        EnderecoService,
        TelefoneService,
        DocumentoService,
        PetService]
})

export class ListarClienteComponent implements OnInit {
    /*Variaveis*/
    @ViewChild('modalVisualizar') public modalVisualizar: ModalDirective;
    alertaUtil: AlertaUtil = new AlertaUtil();
    activeForm: boolean = true;
    pessoas: Pessoa[];
    pessoaVisualizar: Pessoa;
    enderecos: Endereco[];
    telefones: Telefone[];
    documentos: Documento[];
    pets: Pet[];

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService,//
        private router: Router,
        private enderecoService: EnderecoService,
        private telefoneService: TelefoneService,
        private documentoService: DocumentoService,
        private petService: PetService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.recuperarPessoas();
    }

    public recuperarPessoas(): void {
        this.pessoaService.recuperarPessoas()
            .subscribe(
            data => {
                this.pessoas = data.objeto;
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

    public showModalVisualizar(pessoa: Pessoa): void {
        this.pessoaVisualizar = pessoa;
        this.recuperarEnderecoPorPessoaId(this.pessoaVisualizar.id);
        this.recuperarTelefonePorPessoaId(this.pessoaVisualizar.id);
        this.recuperarDocumentoPorPessoaId(this.pessoaVisualizar.id);
        this.recuperarPetPorPessoaId(this.pessoaVisualizar.id);
        this.modalVisualizar.show();
    }

    public getPaginaEditar(pessoa: Pessoa): void {
        this.modalVisualizar.hide();
        if (pessoa !== undefined) {
            this.pessoaVisualizar = pessoa;
        }

        this.router.navigate(['/dashboard/cadastrar-cliente', this.pessoaVisualizar.id]);
    }

    public recuperarEnderecoPorPessoaId(idPessoa: number): void {
        this.enderecoService.recuperarEnderecoPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.enderecos = data.objeto;
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

    public recuperarTelefonePorPessoaId(idPessoa: number): void {
        this.telefoneService.recuperarTelefonePorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.telefones = data.objeto;
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

    public recuperarDocumentoPorPessoaId(idPessoa: number): void {
        this.documentoService.recuperarDocumentoPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.documentos = data.objeto;
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

    public recuperarPetPorPessoaId(idPessoa: number): void {
        this.petService.recuperarPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.pets = data.objeto;
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

}
