import { RelatorioVenda } from './../../../shared/entity/financeiro/relatorio-venda';
import { RelatorioFinanceiroService } from './../../../shared/service/financeiro/relatorio.financeiro.service';
import { AlertaUtil } from './../../../shared/utils/alerta-util';
import { Component, OnInit } from '@angular/core';
// import jsPDF from 'jspdf';
declare let jsPDF;
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

  public imprimirItem(item: RelatorioVenda) {
    console.log(item);
    var doc = new jsPDF();
    doc.text(20, 20, 'Relatório de Financeiro');
    // doc.addImage('../../assets/img/SB-admin','PNG',15,40,180,160)
    
    doc.text(20, 30, `Venda para o cliente: ${item.nomePessoa}.`);
    doc.text(20, 40, 'This is the default font.')
    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(20, 50, 'This is courier normal.')
    doc.setFont('times')
    doc.setFontType('italic')
    doc.text(20, 60, 'This is times italic.')
    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text(20, 70, 'This is helvetica bold.')
    doc.setFont('courier')
    doc.setFontType('bolditalic')
    doc.text(20, 80, 'This is courier bolditalic.')
    doc.addPage();
    doc.text(20, 90, `${item.idVenda}`);

    // Save the PDF
    doc.save(`${item.nomePessoa}.pdf`);
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
