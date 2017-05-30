
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

    // desenvolvimento
    private semServidor = false;

    constructor(private router: Router) { }

    canActivate() {
        // console.log('AuthGuard', 'verificar');
        if (this.semServidor) {
            return true;
        }
        // console.log(tokenNotExpired('id_token'));
        // console.log(tokenNotExpired('token'));
        // console.log(tokenNotExpired('access-token'));        
        //return tokenExistsAndNotExpired();
        if (tokenNotExpired('id_token')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
