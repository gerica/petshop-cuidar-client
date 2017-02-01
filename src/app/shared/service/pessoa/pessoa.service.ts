import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Pessoa } from './../../entity/pessoa/pessoa';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇOS DE PESSOA
const URL_PESSOA = URL_BACK_END + 'pessoa/';
const URL_GRAVAR_PESSOA: string = URL_PESSOA + 'gravar';
const URL_RECUPERAR_PESSOAS: string = URL_PESSOA + 'recuperarTodos';
const URL_RECUPERAR_PESSOA_POR_ID: string = URL_PESSOA + 'recuperarPorId';
const URL_RECUPERAR_PESSOA_POR_NOME: string = URL_PESSOA + 'recuperarPorNome';


@Injectable()
export class PessoaService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(pessoa: Pessoa): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        this.prepararDados(pessoa);

        let body = JSON.stringify(pessoa);

        return this.http.post(URL_GRAVAR_PESSOA, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarPessoas(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PESSOAS, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarPessoaPorNome(nomePessoa: string): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PESSOA_POR_NOME + '/' + nomePessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }


    public recuperarPessoaPorId(idPessoa: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_PESSOA_POR_ID + '/' + idPessoa, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    private prepararDados(pessoa: Pessoa): void {
        if (typeof pessoa.dtNascimento === 'string') {
            let temp: string = '' + pessoa.dtNascimento;

            let ano: number = parseInt(temp.substring(0, 4));
            let mes: number = parseInt(temp.substring(5, 7)) - 1;
            let dia: number = parseInt(temp.substring(8, 10));
            pessoa.dtNascimento = new Date(ano, mes, dia);
        }
    }

}
