import { Medicamento } from './../../../shared/entity/produto/medicamento';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorMedicamento'
})

export class FiltroPorMedicamento implements PipeTransform {

    transform(medicamentos: Medicamento[], digitado: string) {
        if (!medicamentos || !digitado) {
            return medicamentos;
        }

        return medicamentos.filter((item: any) => {
            for (let key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                    (item[key].toUpperCase().indexOf(digitado.toUpperCase()) !== -1)) {
                    console.log(item[key]);
                    console.log(item[key].toUpperCase().indexOf(digitado.toUpperCase()));
                    return true;
                }
            }
            return false;
        });
    }

}
