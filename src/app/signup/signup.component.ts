import { Usuario } from './../shared/entity/authority/usuario';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaUtil} from '../shared/utils/alerta-util';
import { SignupService } from './signup.service';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html',
	providers: [SignupService]
})

export class SignupComponent {
	alertaUtil: AlertaUtil;
	usuario: Usuario;

		/*Construtor*/
	constructor (private router: Router, private signupService: SignupService) {
		this.alertaUtil = new AlertaUtil();
		this.usuario = new Usuario();
	}

	registrar(event: any): void {
      event.preventDefault();
      if(this.validarPassword()) {
       		// Get all comments
       		this.signupService.registrar(this.usuario)
                         .subscribe(
                             result => {

                                 this.router.navigate(['']);
                                 this.alertaUtil.addMessage(
                                  {
                                       type: 'success',
                                       closable: true,
                                       msg: result.mensagem
                                  }
                                  );
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
