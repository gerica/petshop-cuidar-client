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
export const URL_FINANCEIRO: string = URL_BACK_END + 'financeiroRelatorio/';
export const URL_CONSULTAR_VENDA: string = URL_FINANCEIRO + 'consultarVenda';


@Injectable()
export class RelatorioFinanceiroService {

    public constructor(private http: Http,
        private utilsService: UtilsService) { }

    public consultar(periodoValor: string, ano: number, periodo: string, dtInicio: Date, dtFinal: Date): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        let objBody: any = {
            periodoValor: periodoValor,
            ano: ano,
            periodo: periodo,
            dtInicio: dtInicio,
            dtFinal: dtFinal
        };

        return this.http.post(URL_CONSULTAR_VENDA, objBody, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }


}
