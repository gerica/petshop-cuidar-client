import { MedicamentoLote } from './../../../shared/entity/produto/medicamento-lote';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorMedicamentoLote'
})

export class FiltroPorMedicamentoLote implements PipeTransform {

    transform(medicamentoLotes: MedicamentoLote[], digitado: string) {
        if (!medicamentoLotes || !digitado) {
            return medicamentoLotes;
        }

        // return medicamentoLotes.filter((lote) => {
        //     return pessoa.nome.toLowerCase().includes(digitado) ||
        //         pessoa.tipoPessoa.toLowerCase().includes(digitado);
        // });

        return medicamentoLotes.filter((item: any) => {
            for (let key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                    (item[key].toUpperCase().indexOf(digitado.toUpperCase()) !== -1)) {
                    return true;
                } else if ((key !== 'id' && //
                    key !== 'dataLote' && //
                    key !== 'dataValidade' && //
                    typeof item[key] === 'number' || item[key] instanceof Number)) {
                    var tempString = item[key] + '';
                    if (tempString.indexOf(digitado) !== -1) {
                        return true;
                    }
                } else if (key === 'dataLote' || key === 'dataValidade') {
                    let dataLocal = new Date(item[key]);
                    let ano = dataLocal.toLocaleDateString().substring(6, 10);
                    let mes = dataLocal.toLocaleDateString().substring(3, 5);
                    let dia = dataLocal.toLocaleDateString().substring(0, 2);
                    var dataString = dia + '/' + mes + '/' + ano;

                    if (dataString.indexOf(digitado) !== -1) {
                        return true;
                    }
                }

            }
            return false;
        });
    }

}

