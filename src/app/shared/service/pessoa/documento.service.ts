import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Documento } from './../../entity/pessoa/documento';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_DOCUMENTO: string = URL_BACK_END + 'pessoa/';
export const URL_GRAVAR: string = URL_DOCUMENTO + 'gravarDocumento';
export const URL_EXCUIR: string = URL_DOCUMENTO + 'excluirDocumento';
export const URL_POR_PESSOA_ID: string = URL_DOCUMENTO + 'recuperarDocumentoPorPessoaId';


@Injectable()
export class DocumentoService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(documento: Documento, idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            documento: documento,
            // cidade: Documento.cidade,
            idPessoa: idPessoa
        };
        let body = JSON.stringify(objBody);
        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idDocumento: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idDocumento);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarDocumentoPorPessoaId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_POR_PESSOA_ID + '/' + idPessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
