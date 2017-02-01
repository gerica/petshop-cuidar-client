import { UtilsService } from './../utils.service';
import { URL_BACK_END } from './../../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_UTILS: string = URL_BACK_END + 'pet/utils/';
export const URI_RECUPERAR_TODOS_TIPO_PET: string = URL_UTILS + 'recuperarTodosTipoPet';


@Injectable()
export class TipoPetService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public recuperarTodosTipoPet(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URI_RECUPERAR_TODOS_TIPO_PET, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
