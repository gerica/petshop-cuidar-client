import { URL_BACK_END } from './../common/url_const';
import { Usuario } from './../shared/entity/authority/usuario';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// URL BACK END

export const URL_USUARIO: string = URL_BACK_END + 'usuario/';
export const URL_ALTERAR_SENHA: string = URL_USUARIO + 'primeiroLogin';

@Injectable()
export class PrimeiroLoginService {

  constructor(private http: Http) { }

  createAuthorizationHeader(contentHeaders: Headers) {
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');
    contentHeaders.append('X-Auth-Token', localStorage.getItem('id_token'));
  }

  public salvar(usuario: Usuario): Observable<any> {
    let contentHeaders = new Headers();
    this.createAuthorizationHeader(contentHeaders);
    let body = JSON.stringify(usuario);

    return this.http.post(URL_ALTERAR_SENHA, body, { headers: contentHeaders })
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
