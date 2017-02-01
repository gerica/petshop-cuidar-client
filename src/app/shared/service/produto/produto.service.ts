import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_PRODUTO: string = URL_BACK_END + 'produto/';
export const URL_RECUPERAR_PRODUTO_POR_DESCRICAO: string = URL_PRODUTO + 'recuperarProdutoPorDescricao';
export const URL_RECUPERAR_LOTE_POR_ID_PRODUTO: string = URL_PRODUTO + 'recuperarLotePorIdProduto';

@Injectable()
export class ProdutoService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public recuperarProdutoPorDescricao(descricao: string): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PRODUTO_POR_DESCRICAO + '/' + descricao, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarLotePorIdProduto(idProduto: number, tipoProduto: string): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_LOTE_POR_ID_PRODUTO + '/' + idProduto + '/' + tipoProduto, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }
}
