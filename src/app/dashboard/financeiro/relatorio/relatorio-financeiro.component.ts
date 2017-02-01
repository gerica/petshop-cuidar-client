import { RelatorioVenda } from './../../../shared/entity/financeiro/relatorio-venda';
import { RelatorioFinanceiroService } from './../../../shared/service/financeiro/relatorio.financeiro.service';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'fa-relatorio-financiero',
  templateUrl: './relatorio-financeiro.component.html',
  providers: [RelatorioFinanceiroService]
})
export class RelatorioFinanceiroComponent implements OnInit {
  alertaUtil: AlertaUtil = new AlertaUtil();
  activeForm: boolean = true;
  periodoValor: string = '00';
  ano: number = 0;
  periodo: string = 'Selecione';
  dtInicio: Date;
  dtFinal: Date;
  relatorioVendas: RelatorioVenda[];

  constructor(private relatorioFinanceiroService: RelatorioFinanceiroService) { }

  ngOnInit() {
  }

  public consultar(event: any): void {
    event.preventDefault();
    if (this.validarConsulta()) {
      this.relatorioFinanceiroService.consultar(this.periodoValor, this.ano, this.periodo, this.dtInicio, this.dtFinal)
        .subscribe(
        result => {
          this.relatorioVendas = result.objeto;
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
    } else {
      this.alertaUtil.addMessage({
        type: 'warning',
        closable: true,
        msg: 'Informe todos os campos.'
      });
    }
  }

  public montarTela(valor: string): void {
    console.log('Periodo ', this.periodo);
    console.log('Valor ', valor);
  }

  private validarConsulta(): boolean {
    if (this.periodo === 'Anual') {
      return (this.ano > 0);
    } else if (this.periodo === 'Mensal' || this.periodo === 'Bimestral' || this.periodo === 'Trimestral'
      || this.periodo === 'Simestral') {
      return (this.ano > 0 && this.periodoValor !== '00');
    }
    return false;
  }

}
