import { RacaoLote } from './../../entity/produto/racao-lote';
import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_RACAO_LOTE: string = URL_BACK_END + 'racao/lote/';
export const URL_GRAVAR: string = URL_RACAO_LOTE + 'gravar';
export const URL_EXCUIR: string = URL_RACAO_LOTE + 'excluir';
export const URI_RECUPERAR_TODAS: string = URL_RACAO_LOTE + 'recuperarTodas';
export const URI_RECUPERAR_POR_RACAO_ID: string = URL_RACAO_LOTE + 'recuperarPorRacaoId';

@Injectable()
export class RacaoLoteService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(racaoLote: RacaoLote, idRacao: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            racaoLote: racaoLote,
            idRacao: idRacao
        };
        let body = JSON.stringify(objBody);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idRacaoLote: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idRacaoLote);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarTodas(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarPorRacaoId(idRacao: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_POR_RACAO_ID + '/' + idRacao, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
