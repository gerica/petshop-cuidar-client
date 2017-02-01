import { Usuario } from './../shared/entity/authority/usuario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaUtil } from '../shared/utils/alerta-util';
import { PrimeiroLoginService } from './primeiro-login.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
/**
*	This class represents the lazy loaded PrimeiroLoginComponent.
*/

@Component({
    moduleId: module.id,
    selector: 'primeiro-login-cmp',
    templateUrl: 'primeiro-login.component.html',
    providers: [PrimeiroLoginService]
})

export class PrimeiroLoginComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    alertaUtil: AlertaUtil;
    usuario: Usuario;

    /*Construtor*/
    constructor(private router: Router,
        private primeiroLoginService: PrimeiroLoginService,
        private route: ActivatedRoute) {
        this.alertaUtil = new AlertaUtil();
        this.usuario = new Usuario();
    }
    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            if (params && params['email']) {
                this.usuario.email = params['email'];
            }

            // In a real app: dispatch action to load the details here.
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    salvar(event: any): void {
        event.preventDefault();
        if (this.validarPassword()) {
            // Get all comments
            this.primeiroLoginService.salvar(this.usuario)
                .subscribe(
                result => {
                    this.router.navigate(['/login', result.message]);
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage(
                        {
                            type: 'danger',
                            closable: true,
                            msg: err.message
                        }
                    );
                });
        } else {
            this.alertaUtil.addMessage(
                {
                    type: 'danger',
                    closable: true,
                    msg: 'As senhas informadas não são iguais.'
                }
            );
        }

        // DESENVOLVER SEM O SERVIDOR
        // this.router.navigate(['/dashboard/home']);                        
    }
    validarPassword(): boolean {
        return this.usuario.password === this.usuario.passwordrp;

    }

}
