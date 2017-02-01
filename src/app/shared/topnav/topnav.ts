import { Usuario } from './../entity/authority/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'top-nav',
	templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {
	usuario: Usuario;

	constructor(private router: Router) { }

	/*Métodos*/
	public ngOnInit(): void {
		this.usuario = JSON.parse(localStorage.getItem('usuario_'));
	}

	changeTheme(color: string): void {

		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({ type: 'text/css', rel: 'stylesheet' })
			.attr('href', 'themes/app-' + color + '.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}

	logout(): void {
		localStorage.removeItem('id_token');
		localStorage.removeItem('usuario_investimento');
		this.router.navigate(['']);

	}
}
