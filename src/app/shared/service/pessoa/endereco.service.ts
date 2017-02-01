import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Endereco } from './../../entity/pessoa/endereco';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_ENDERECO: string = URL_BACK_END + 'pessoa/';
export const URL_GRAVAR: string = URL_ENDERECO + 'gravarEndereco';
export const URL_EXCUIR: string = URL_ENDERECO + 'excluirEndereco';
export const URL_POR_PESSOA_ID: string = URL_ENDERECO + 'recuperarEnderecoPorPessoaId';


@Injectable()
export class EnderecoService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(endereco: Endereco, idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            endereco: endereco,
            // cidade: endereco.cidade,
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

    public excluir(idEndereco: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idEndereco);
        console.log('valores', body);
        return this.http.post(URL_EXCUIR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarEnderecoPorPessoaId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_POR_PESSOA_ID + '/' + idPessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
