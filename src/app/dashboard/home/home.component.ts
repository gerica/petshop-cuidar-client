import { LembreteService } from './../../shared/service/relacionamento/lembrete.service';
import { Usuario } from './../../shared/entity/authority/usuario';
import { RoleEnum } from './../../shared/entity/authority/roleEnum';
import { OrcamentoService } from './../../shared/service/venda/orcamento.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertaUtil } from '../../shared/utils/alerta-util';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

/**
 *    This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [OrcamentoService, LembreteService]
})

export class HomeComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    alertaUtil: AlertaUtil = new AlertaUtil();
    qtdOrcamento: number;
    qtdLembrete: number;

    // Roles
    isAdmin = false;// ADMIN
    isConvidado = false;//"CONVIDADO"
    isFinanceiro = false;//"FINANCEIRO"
    isEstoque = false;//"ESTOQUE"
    isRelacionamento = false;//"RELACIONAMENTO"
    isVenda = false;//"VENDA"

    constructor(private route: ActivatedRoute,
        private orcamentoService: OrcamentoService,
        private lembreteService: LembreteService) { }

    public ngOnInit(): void {
        this.subscription = this.route.params.subscribe(params => {
            if (params && params['desc']) {
                this.alertaUtil.addMessage({
                    type: 'success',
                    closable: true,
                    msg: params['desc']
                });
            }
        });
        this.checkRole(JSON.parse(localStorage.getItem('usuario_')));
        this.recuperarQuantidadeOrcamento();
        this.recuperarQuantidadeLembrete();

    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public recuperarQuantidadeOrcamento(): void {
        if (this.isAdmin || this.isVenda) {
            this.orcamentoService.recuperarQuantidadeOrcamento()
                .subscribe(
                data => {
                    this.qtdOrcamento = data.objeto;
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message === undefined ? err : err.message
                    });
                }
                );
        }
    }

    public recuperarQuantidadeLembrete(): void {
        if (this.isAdmin || this.isRelacionamento || this.isVenda) {
            this.lembreteService.recuperarQuantidadeLembrete()
                .subscribe(
                data => {
                    this.qtdLembrete = data.objeto;
                },
                err => {
                    // Log errors if any
                    this.alertaUtil.addMessage({
                        type: 'danger',
                        closable: true,
                        msg: err.message === undefined ? err : err.message
                    });
                }
                );
        }
    }

    private checkRole(usuario: Usuario): void {
        if (usuario) {
            usuario.authorities.forEach((element) => {
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
