import { TipoPet } from './../../entity/pet/tipoPet';
import { Medicamento } from './../../entity/produto/medicamento';
import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_MEDICAMENTO: string = URL_BACK_END + 'medicamento/';
export const URL_GRAVAR: string = URL_MEDICAMENTO + 'gravar';
export const URL_EXCUIR: string = URL_MEDICAMENTO + 'excluir';
export const URI_RECUPERAR_TODAS: string = URL_MEDICAMENTO + 'recuperarTodas';
export const URI_RECUPERAR_TODAS_CATEGORIA: string = URL_MEDICAMENTO + 'recuperarTodasCategoria';
export const URI_RECUPERAR_TODAS_PORTE: string = URL_MEDICAMENTO + 'recuperarTodasPorte';
export const URI_RECUPERAR_TODAS_FAIXA_IDADE: string = URL_MEDICAMENTO + 'recuperarTodasFaixaIdade';

@Injectable()
export class MedicamentoService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public gravar(medicamento: Medicamento, tiposPet: TipoPet[]): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            medicamento: medicamento,
            tiposPet: tiposPet
        };
        let body = JSON.stringify(objBody);

        return this.http.post(URL_GRAVAR, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public excluir(idMedicamento: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let body = JSON.stringify(idMedicamento);
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

    public recuperarTodasCategoria(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODAS_CATEGORIA, { headers: contentHeaders })
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
