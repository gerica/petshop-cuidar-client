import { Usuario } from './../shared/entity/authority/usuario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaUtil } from '../shared/utils/alerta-util';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

/**
 *  This class represents the lazy loaded LoginComponent.
 */

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    usuario = new Usuario();
    alertaUtil: AlertaUtil = new AlertaUtil();

    constructor(private loginSerice: LoginService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            if (params && params['desc']) {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: params['desc']
                });
            }

            // In a real app: dispatch action to load the details here.
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login(event: any): void {
        event.preventDefault();

        // Get all comments
        this.loginSerice.login(this.usuario)
            .subscribe(
            result => {
                localStorage.setItem('id_token', result.token);
                let usuarioLocal = result.usuario;
                usuarioLocal.password = '';
                localStorage.setItem('usuario_', JSON.stringify(usuarioLocal));
                this.router.navigate(['/dashboard/home']);
            },
            err => {
                // Log errors if any
                if (err.objeto && err.objeto.lock === true) {
                    this.router.navigate(['/primeiro-login', err.objeto.usuarioEmail]);
                }
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });

                //desenvovimento
                // this.router.navigate(['/dashboard/home']);
            });
    }

}
