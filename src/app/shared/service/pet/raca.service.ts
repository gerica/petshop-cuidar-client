import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_UTILS: string = URL_BACK_END + 'pet/utils/';
export const URI_RECUPERAR_RACA_POR_TIPO: string = URL_UTILS + 'recuperarRacaTipo';


@Injectable()
export class RacaService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public recuperarRacaTipo(idTipoPet: number): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_RACA_POR_TIPO + '/' + idTipoPet, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
