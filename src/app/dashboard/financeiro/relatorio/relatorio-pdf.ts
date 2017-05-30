import { RelatorioVenda } from './../../../shared/entity/financeiro/relatorio-venda';

export class RelatorioPdf {
  private _imageBase64: string;

  constructor(private item: RelatorioVenda) { }

  private _docDefinition = {
    // a string or { width: number, height: number }
    pageSize: 'A4',

    // by default we use portrait, you can change it to landscape if you wish
    pageOrientation: 'landscape',

    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [20, 20, 20, 20],
    info: {
      title: 'Relatorio Financeiro',
      author: 'Rogério Cardoso',
      subject: 'acompanhamento de vendas'
    },
    header: 'Pet Shep',
    footer: {
      style: 'footer',
      columns: [
        `Usuário: ${this.item.nomeUsuario}`,
        { text: this.formatDate(new Date()), alignment: 'right' }
      ]
    },
    content: [
      {
        columns: [
          {
            style: 'header',
            width: 68,
            image: 'data:image/png;base64,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',
          }, {
            style: 'header',
            width: '*',
            text: `Relatório Financeiro`,
          },
        ]
      }, {
        style: 'subtitle',
        width: '*',
        text: `Cliente - ${this.item.nomePessoa}`,
      }, {
        canvas:
        [
          {
            type: 'line',
            x1: 0, y1: 0,
            x2: 800, y2: 0,
            lineWidth: 1
          },
        ]
      }, {
        text: `Venda`,
        style: 'titulo',
      }, {
        alignment: 'center',
        table: {
          widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
          body: [
            [
              'Venda',
              'Desconto',
              'Data Venda',
              'Quantidade',
              'Valor total',
              'Cliente',
              'Usuário',
              'Data Orçamento'
            ],
            [
              `${this.item.idVenda}`,
              `${this.item.desconto}%`,
              this.formatDate(this.item.dtVenda),
              `${this.item.quantidade}`,
              `R$${this.item.valorTotal}`,
              `${this.item.nomePessoa}`,
              `${this.item.nomeUsuario}`,
              this.formatDate(this.item.dtOrcamento)
            ]
          ]
        }
      }

    ],
    styles: {
      header: {
        fontSize: 34,
        bold: true,
        alignment: 'center',
        // margin: [10, 0, 0, 0]
        // left;top;right;bottom
      },
      footer: {
        fontSize: 8,
        bold: true,
      },
      subtitle: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center',
      },
      titulo: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 20]
      }
    }
  }

  get docDefinition(): any {
    return this._docDefinition;
  }

  private formatDate(paramData: Date): string {
    let dtLocal = paramData;
    let dia: string = dtLocal.getDate().toString();
    let mes: string = (dtLocal.getMonth() + 1).toString();
    var ano: string = dtLocal.getFullYear().toString();

    if (dia.toString().length == 1)
      dia = "0" + dia;
    if (mes.toString().length == 1)
      mes = "0" + mes;

    return `${dia}/${mes}/${ano}`;
  }

}