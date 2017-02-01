import { Orcamento } from './../../entity/venda/orcamento';
import { ItemVenda } from './../../entity/produto/item-venda';
import { Pessoa } from './../../entity/pessoa/pessoa';
import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_ORCAMENTO: string = URL_BACK_END + 'orcamento/';
export const URL_GRAVAR: string = URL_ORCAMENTO + 'gravar';
export const URL_EXCUIR: string = URL_ORCAMENTO + 'excluir';
export const URI_RECUPERAR_TODAS: string = URL_ORCAMENTO + 'recuperarTodas';
export const URI_RECUPERAR_POR_ORCAMENTO_ID = URL_ORCAMENTO + 'recuperarPorOrcamentoId';
export const URI_RECUPERAR_QUANTIDADE_ORCAMENTOS = URL_ORCAMENTO + 'recuperarQuantidadeOrcamentos';

@Injectable()
export class OrcamentoService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(orcamento: Orcamento, pessoa: Pessoa, itens: ItemVenda[]): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            id: orcamento.id,
            pessoa: pessoa,
            itens: itens
        };
        let body = JSON.stringify(objBody);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idOrcamento: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idOrcamento);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarTodos(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarPorOrcamentoId(idOrcamento: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_POR_ORCAMENTO_ID + '/' + idOrcamento, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarQuantidadeOrcamento(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_QUANTIDADE_ORCAMENTOS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
