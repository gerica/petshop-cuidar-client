import { Usuario } from './../entity/authority/usuario';
import { RoleEnum } from './../entity/authority/roleEnum';
import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
	isActive = false;
	usuario: Usuario;
	showMenu: string = '';
	// Roles
	isAdmin = false;// ADMIN
	isConvidado = false;//"CONVIDADO"
	isFinanceiro = false;//"FINANCEIRO"
	isEstoque = false;//"ESTOQUE"
	isRelacionamento = false;//"RELACIONAMENTO"
	isVenda = false;//"VENDA"

	ngOnInit() {
		this.usuario = JSON.parse(localStorage.getItem('usuario_'));
		this.checkRole();
	}

	eventCalled() {
		this.isActive = !this.isActive;
	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}

	private checkRole(): void {
		if (this.usuario) {
			this.usuario.authorities.forEach((element) => {
				if (element.authority === RoleEnum[RoleEnum.ADMIN]) {
					this.isAdmin = true;
				}
				if (element.authority === RoleEnum[RoleEnum.CONVIDADO]) {
					this.isConvidado = true;
				}
				if (element.authority === RoleEnum[RoleEnum.FINANCEIRO]) {
					this.isFinanceiro = true;
				}
				if (element.authority === RoleEnum[RoleEnum.ESTOQUE]) {
					this.isEstoque = true;
				}
				if (element.authority === RoleEnum[RoleEnum.RELACIONAMENTO]) {
					this.isRelacionamento = true;
				}
				if (element.authority === RoleEnum[RoleEnum.VENDA]) {
					this.isVenda = true;
				}
			});
		}
	}
}
