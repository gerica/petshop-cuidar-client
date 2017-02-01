import { URL_BACK_END } from './../common/url_const';
import { Usuario } from './../shared/entity/authority/usuario';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// URL BACK END

export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_AUTH + 'registrarUsuario';


@Injectable()
export class SignupService {
    private _url = URL_REGISTRAR;

    constructor(private http: Http) { }

    public registrar(usuario: Usuario): Observable<any> {
      let body = JSON.stringify(usuario);

      return this.http.post(this._url, body, { headers: contentHeaders })
                      // ...and calling .json() on the response to return data
                       .map((res:Response) => res.json())
                       //...errors if any
                       .catch((error:any) => Observable.throw(error.json()));
     }

}
