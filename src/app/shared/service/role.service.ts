import { UtilsService } from './utils.service';
import { URL_BACK_END } from './../../common/url_const';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇOS DE ROLE
export const URL_ROLE = URL_BACK_END + 'role/';
export const URL_RECUPERAR_ROLES: string = URL_ROLE + 'recuperarTodos';

@Injectable()
export class RoleService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }

    public recuperarRoles(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_ROLES, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
