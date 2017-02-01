import { URL_BACK_END } from './../common/url_const';
import { Usuario } from './../shared/entity/authority/usuario';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// SERVIÇO DE AUTENTICAÇÃO
export const URL_AUTH: string = URL_BACK_END + 'auth';
export const URL_REGISTRAR: string = URL_AUTH + 'registrarUsuario';


@Injectable()
export class LoginService {
  private _url = URL_AUTH;

  constructor(private http: Http) { }

  public login(usuario: Usuario): Observable<any> {
    let body = JSON.stringify(usuario);

    return this.http.post(this._url, body, { headers: contentHeaders })
      // ...and calling .json() on the response to return data
      .map(this.extractData)
      //...errors if any
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(error.json());
  }
}
