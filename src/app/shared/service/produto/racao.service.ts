import { Racao } from './../../entity/produto/racao';
import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_RACAO: string = URL_BACK_END + 'racao/';
export const URL_GRAVAR: string = URL_RACAO + 'gravar';
export const URL_EXCUIR: string = URL_RACAO + 'excluir';
export const URI_RECUPERAR_TODAS: string = URL_RACAO + 'recuperarTodas';
export const URI_RECUPERAR_TODAS_LINHA: string = URL_RACAO + 'recuperarTodasLinha';
export const URI_RECUPERAR_TODAS_PORTE: string = URL_RACAO + 'recuperarTodasPorte';
export const URI_RECUPERAR_TODAS_FAIXA_IDADE: string = URL_RACAO + 'recuperarTodasFaixaIdade';

@Injectable()
export class RacaoService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(racao: Racao): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(racao);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idRacao: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idRacao);
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

    public recuperarTodasLinhaRacao(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS_LINHA, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarTodasPorte(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS_PORTE, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarTodasFaixaIdade(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS_FAIXA_IDADE, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
