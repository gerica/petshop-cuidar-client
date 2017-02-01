import { UtilsService } from './utils.service';
import { URL_BACK_END } from './../../common/url_const';
import { Usuario } from './../entity/authority/usuario';
import { Role } from './../entity/authority/role';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// SERVIÇOS DE USUAŔIO
export const URL_USUARIO: string = URL_BACK_END + 'usuario/';
export const URL_INCLUIR_USUARIO: string = URL_USUARIO + 'incluir';
export const URL_ALTERAR_USUARIO: string = URL_USUARIO + 'alterar';
export const URL_RECUPERAR_USUARIOS_ATIVO: string = URL_USUARIO + 'recuperarUsuariosAtivo';
export const URL_RECUPERAR_USUARIOS_INATIVO: string = URL_USUARIO + 'recuperarUsuariosInativo';
export const URL_ALTERAR_SENHA: string = URL_USUARIO + 'primeiroLogin';
export const URL_INATIVAR_USUARIO: string = URL_USUARIO + 'inativarUsuario';
export const URL_ATIVAR_USUARIO: string = URL_USUARIO + 'ativarUsuario';
export const URL_RESET_PASSWORD: string = URL_USUARIO + 'resetPassword';

@Injectable()
export class UsuarioService {

    constructor(private http: Http,
        private utilsService: UtilsService) { }


    public incluirUsuario(usuario: Usuario, roles: Role[]): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        let objBody: any = {
            usuario: usuario,
            roles: roles
        };
        let body = JSON.stringify(objBody);

        return this.http.post(URL_INCLUIR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public alterarUsuario(usuario: Usuario, roles: Role[]): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        let objBody: any = {
            usuario: usuario,
            roles: roles
        };
        let body = JSON.stringify(objBody);

        return this.http.post(URL_ALTERAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public inativarUsuario(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_INATIVAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public ativarUsuario(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_ATIVAR_USUARIO, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public resetPassword(usuario: Usuario): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);
        let body = JSON.stringify(usuario);

        return this.http.post(URL_RESET_PASSWORD, body, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarUsuariosAtivo(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_USUARIOS_ATIVO, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

    public recuperarUsuariosInativo(): Observable<any> {
        let contentHeaders = new Headers();
        this.utilsService.createAuthorizationHeader(contentHeaders);

        return this.http.get(URL_RECUPERAR_USUARIOS_INATIVO, { headers: contentHeaders })
            // ...and calling .json() on the response to return data
            .map(this.utilsService.extractData)
            //...errors if any
            .catch(this.utilsService.handleError);
    }

}
