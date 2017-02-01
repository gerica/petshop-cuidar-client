import { ProdutoService } from './../../shared/service/produto/produto.service';
import { Observable } from 'rxjs/Rx';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'tyahead-produto',
    templateUrl: './typeahead-produto.component.html',
    providers: [ProdutoService]
})

export class TypeAheadProdutoComponent {
    @Output() notifyProduto: EventEmitter<any> = new EventEmitter<any>();
    produtos: any[];
    asyncSelected: string = '';
    dataSource: Observable<any>;
    typeaheadLoading: boolean = false;
    typeaheadNoResults: boolean = false;

    /**
     * Construtor
     */
    constructor(private produtoService: ProdutoService) {
        this.dataSource = Observable.create((observer: any) => {
            this.recuperarProdutoPorDescricao(observer);
        }).mergeMap(() => this.getStatesAsObservable());

    }

    public recuperarProdutoPorDescricao(observer: any): void {
        this.produtoService.recuperarProdutoPorDescricao(this.asyncSelected)
            .subscribe(
            data => {
                this.produtos = data.objeto;
                observer.next();

            },
            error => {
                console.log(error.message === undefined ? error : error.message);
            }
            );
    }

    public getStatesAsObservable(): Observable<any> {
        return Observable.of(this.produtos);
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
    public notifyProdutoEmit(e: any) {
        this.notifyProduto.emit(e.item);
        this.asyncSelected = null;

    }

}
