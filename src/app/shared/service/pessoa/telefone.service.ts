import { UtilsService } from './../utils.service';
import { Telefone } from './../../entity/pessoa/telefone';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_TELEFONE: string = URL_BACK_END + 'pessoa/';
export const URL_GRAVAR: string = URL_TELEFONE + 'gravarTelefone';
export const URL_EXCUIR: string = URL_TELEFONE + 'excluirTelefone';
export const URL_POR_PESSOA_ID: string = URL_TELEFONE + 'recuperarTelefonePorPessoaId';


@Injectable()
export class TelefoneService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(telefone: Telefone, idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            telefone: telefone,
            idPessoa: idPessoa
        };
        let body = JSON.stringify(objBody);
        console.log('valores', body);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idTelefone: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idTelefone);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarTelefonePorPessoaId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_POR_PESSOA_ID + '/' + idPessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
