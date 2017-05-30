import { Role } from './../../shared/entity/authority/role';
import { Usuario } from './../../shared/entity/authority/usuario';
import { RoleService } from './../../shared/service/role.service';
import { UsuarioService } from './../../shared/service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'form-operacao',
    templateUrl: './cadastrar-usuario.component.html',
    providers: [UsuarioService, RoleService]
})

export class CadastrarUsuarioComponent implements OnInit {
    /*Variaveis*/
    @ViewChild('modalDesativar') public modalDesativar: ModalDirective;
    @ViewChild('modalAtivar') public modalAtivar: ModalDirective;
    @ViewChild('modalResetPassword') public modalResetPassword: ModalDirective;
    @ViewChild('modalEditarUsuario') public modalEditarUsuario: ModalDirective;
    alertaUtil: AlertaUtil = new AlertaUtil();
    usuario: Usuario;
    usuarioModal: Usuario;
    usuarios: Usuario[];
    usuariosDisabilitados: Usuario[];
    roles: Role[];
    rolesSelected: Role[];
    rolesSelectedModal: Role[];
    activeForm: boolean = true;

    /**
     * Construtor
     */
    constructor(private usuarioService: UsuarioService, private roleService: RoleService) {

    }

    /**
     * Método chamado quando esse componente iniciar
     */
    public ngOnInit(): void {
        this.usuario = new Usuario();
        this.recuperarUsuariosAtivo();
        this.recuperarUsuariosInativo();
        this.recuperarRoles();
    }

    public novo() {
        this.usuario = new Usuario();
        this.activeForm = false;
        setTimeout(() => this.activeForm = true, 0);
    }

    /**
     * Grava novo usuário
     */
    public gravar(event: any): void {
        event.preventDefault();

        this.usuarioService.incluirUsuario(this.usuario, this.rolesSelected)
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
                this.novo();
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }

    /**
     * Recuperar todos os usuários ativos
     */
    public recuperarUsuariosAtivo(): void {
        this.usuarioService.recuperarUsuariosAtivo()
            .subscribe(
            data => {
                this.usuarios = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    /**
     * Recuperar todos os usuários inativos
     */
    public recuperarUsuariosInativo(): void {
        this.usuarioService.recuperarUsuariosInativo()
            .subscribe(
            data => {
                this.usuariosDisabilitados = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    /**
     * Recuperar todas as roles
     */
    public recuperarRoles(): void {
        this.roleService.recuperarRoles()
            .subscribe(
            data => {
                this.roles = data.objeto;
            },
            error => {
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: error.message === undefined ? error : error.message
                });
            }
            );
    }

    public getRolesUsuario(usuario: Usuario): string {
        let result: string;
        usuario.authorities.forEach((e) => {
            if (e.authority) {
                if (!result) {
                    result = e.authority;
                } else {
                    result = result + ', ' + e.authority;
                }
            }

        });
        return result;
    }

    public showModalDesativar(usuario: Usuario): void {
        this.usuarioModal = usuario;
        this.modalDesativar.show();
    }

    public inativarUsuario(event: any): void {
        event.preventDefault();
        this.usuarioService.inativarUsuario(this.usuarioModal)
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.recuperarUsuariosInativo();
                this.modalDesativar.hide();
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });
            });
    }

    public showModalAtivar(usuario: Usuario): void {
        this.usuarioModal = usuario;
        this.modalAtivar.show();
    }

    public ativarUsuario(event: any): void {
        event.preventDefault();
        this.usuarioService.ativarUsuario(this.usuarioModal)
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.recuperarUsuariosInativo();
                this.modalAtivar.hide();
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });
            });
    }

    public showModalResetPassword(usuario: Usuario): void {
        this.usuarioModal = usuario;
        this.modalResetPassword.show();
    }

    public resetPassword(event: any): void {
        event.preventDefault();
        this.usuarioService.resetPassword(this.usuarioModal)
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.modalResetPassword.hide();
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message
                });
            });
    }

    public showModalEditarUsuario(usuario: Usuario): void {
        // this.recuperarRoles();
        this.usuarioModal = new Usuario();
        this.usuarioModal.username = usuario.username;
        this.usuarioModal.email = usuario.email;
        this.rolesSelectedModal = [];
        usuario.authorities.forEach((authroty) => {
            this.roles.forEach((role) => {
                if (role.nome === authroty.authority) {
                    this.rolesSelectedModal.push(role);
                }
            });
        });
        this.modalEditarUsuario.show();
    }

    /**
    * alterarUsuario
    */
    public alterarUsuario(event: any): void {
        event.preventDefault();
        console.log(this.rolesSelectedModal);

        this.usuarioService.alterarUsuario(this.usuarioModal, this.rolesSelectedModal)
            .subscribe(
            result => {
                this.recuperarUsuariosAtivo();
                this.modalEditarUsuario.hide();
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: result.message
                });
            },
            err => {
                // Log errors if any
                this.alertaUtil.addMessage({
                    type: 'danger',
                    closable: true,
                    msg: err.message === undefined ? err : err.message
                });
            });
    }
}
