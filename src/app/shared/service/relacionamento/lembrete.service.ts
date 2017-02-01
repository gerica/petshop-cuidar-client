import { Lembrete } from './../../entity/relacionamento/lembrete';
import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_LEMBRETE: string = URL_BACK_END + 'lembrete/';
export const URL_GRAVAR: string = URL_LEMBRETE + 'gravar';
export const URL_EXCUIR: string = URL_LEMBRETE + 'excluir';
export const URI_RECUPERAR_ABERTO: string = URL_LEMBRETE + 'recuperarAberto';
export const URI_RECUPERAR_QUANTIDADE_LEMBRETE: string = URL_LEMBRETE +'recuperarQuantidadeLembrete';

@Injectable()
export class LembreteService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(lembrete: Lembrete, idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            lembrete: lembrete,
            idPessoa: idPessoa
        };
        let body = JSON.stringify(objBody);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idLembrete: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idLembrete);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarAberto(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_ABERTO, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarQuantidadeLembrete(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_QUANTIDADE_LEMBRETE, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }
}
