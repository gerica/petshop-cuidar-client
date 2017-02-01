import { Pet } from './../entity/pet/pet';
import { PetService } from './../service/pet/pet.service';
import { PessoaService } from './../../shared/service/pessoa/pessoa.service';
import { Observable } from 'rxjs/Rx';
import { Pessoa } from './../../shared/entity/pessoa/pessoa';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'tyahead-cliente',
    templateUrl: './typeahead-cliente.component.html',
    providers: [PessoaService, PetService]
})

export class TypeAheadClienteComponent {
    @Output() notifyCliente: EventEmitter<any> = new EventEmitter<any>();
    clientes: Pessoa[];
    pets: Pet[];
    asyncSelected: string = '';
    dataSource: Observable<any>;
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;

    /**
     * Construtor
     */
    constructor(private pessoaService: PessoaService,
        private petService: PetService) {
        this.dataSource = Observable.create((observer: any) => {
            this.recuperarPessoaPorNome(observer);
        }).mergeMap(() => this.getStatesAsObservable());

    }

    public recuperarPessoaPorNome(observer: any): void {
        this.pessoaService.recuperarPessoaPorNome(this.asyncSelected)
            .subscribe(
            data => {
                this.clientes = data.objeto;
                if (this.clientes.length > 0) {
                    observer.next();
                } else {
                    this.recuperarPetPorNome(observer);
                }

            },
            error => {
                console.log(error.message === undefined ? error : error.message);
            }
            );
    }

    public recuperarPetPorNome(observer: any): void {
        this.petService.recuperarPetPorNome(this.asyncSelected)
            .subscribe(
            data => {
                this.pets = data.objeto;
                this.pets.forEach(e => {
                    e.nome = e.pessoa.nome + ' - ' + e.nome;
                });
                observer.next();
            },
            error => {
                console.log(error.message === undefined ? error : error.message);
            }
            );
    }

    public getStatesAsObservable(): Observable<any> {
        if (this.clientes.length > 0) {
            return Observable.of(this.clientes);
        }
        return Observable.of(this.pets);
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    /**
     * Método que quando acionado chamará um método no componente pai. 
     * Nesse caso chamará
     * onSelectedCliene()
     */
    public notifyClienteEmit(e: any) {
        if (this.clientes.length > 0) {
            this.notifyCliente.emit(e.item);
        } else {
            this.notifyCliente.emit(e.item.pessoa);
        }

    }

}
