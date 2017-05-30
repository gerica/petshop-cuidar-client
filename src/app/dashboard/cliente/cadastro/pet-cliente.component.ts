import { Raca } from './../../../shared/entity/pet/raca';
import { TipoPet } from './../../../shared/entity/pet/tipoPet';
import { Pet } from './../../../shared/entity/pet/pet';
import { PetService } from './../../../shared/service/pet/pet.service';
import { RacaService } from './../../../shared/service/pet/raca.service';
import { TipoPetService } from './../../../shared/service/pet/tipo-pet.service';
import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'tab-pet-cliente',
    templateUrl: './pet-cliente.component.html',
    providers: [TipoPetService, RacaService, PetService]
})

export class PetClienteComponent implements OnInit, OnChanges {
    /*Variaveis*/
    @Output() notifyAlerta: EventEmitter<any> = new EventEmitter<any>();
    @Input() pessoa: Pessoa;
    @ViewChild('modalExcluir') public modalExcluir: ModalDirective;
    activeForm: boolean = true;

    pet: Pet;
    petExcluir: Pet;
    pets: Pet[];
    tipoPetObj: TipoPet;
    tiposPet: TipoPet[];
    racas: Raca[];
    selectedRaca: string;

    /**
     * Construtor
     */
    constructor(private tipoPetService: TipoPetService,
        private racaService: RacaService,
        private petService: PetService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.pet = new Pet();
        this.recuperarTodosTipoPet();
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
                this.recuperarPorPessoaId(this.pessoa.id);
            }

        };
    }

    public novo() {
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
        this.pet = new Pet();
        this.tipoPetObj = new TipoPet();
        this.selectedRaca = null;
    }

    public gravar(event: any): void {
        event.preventDefault();
        this.petService.gravar(this.pet, this.pessoa.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorPessoaId(this.pessoa.id);
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
        this.petService.excluir(this.petExcluir.id)
            .subscribe(
            result => {
                this.notifyAlertaEmit({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.recuperarPorPessoaId(this.pessoa.id);
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

    public recuperarPorPessoaId(idPessoa: number): void {
        this.petService.recuperarPorPessoaId(idPessoa)
            .subscribe(
            data => {
                this.pets = data.objeto;
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

    public recuperarTodosTipoPet(): void {
        this.tipoPetService.recuperarTodosTipoPet()
            .subscribe(
            data => {
                this.tiposPet = data.objeto;
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

    public carregarParaEdicao(pet: Pet): void {
        this.pet = pet;
        this.tiposPet.forEach((e) => {
            if (e.id === this.pet.raca.tipoPet.id) {
                this.tipoPetObj = e;
            }
        });

        this.selectedRaca = this.pet.raca.dsNome;
        this.recuperarRacaTipo(this.pet.raca.tipoPet.id);
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
        this.petExcluir = this.pet;
        this.modalExcluir.show();
    }

    public onChange(td: TipoPet) {
        this.pet.raca = null;
        this.selectedRaca = null;
        this.recuperarRacaTipo(td.id);
    }

    public recuperarRacaTipo(idTipoPet: number): void {
        this.racaService.recuperarRacaTipo(idTipoPet)
            .subscribe(
            data => {
                this.racas = data.objeto;
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

    public typeaheadOnSelectRaca(e: any): void {
        this.pet.raca = e.item;
    }

}
