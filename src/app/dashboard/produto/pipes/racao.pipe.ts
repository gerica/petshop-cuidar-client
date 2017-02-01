import { Racao } from './../../../shared/entity/produto/racao';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorRacao'
})

export class FiltroPorRacao implements PipeTransform {

    transform(racoes: Racao[], digitado: string) {
        if (!racoes || !digitado) {
            return racoes;
        }

        return racoes.filter((item: any) => {
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
