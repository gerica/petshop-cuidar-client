import { Pessoa } from './../../../shared/entity/pessoa/pessoa';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorCliente'
})

export class FiltroPorCliente implements PipeTransform {

    transform(pessoas: Pessoa[], digitado: string) {
        if (!pessoas) {
            return pessoas;
        }

        // digitado = digitado.toLowerCase();

        // return pessoas.filter((pessoa) => {
        //     return pessoa.nome.toLowerCase().includes(digitado) ||
        //         pessoa.tipoPessoa.toLowerCase().includes(digitado);
        // });

        return pessoas.filter((item: any) => {
            for (let key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                    (item[key].toUpperCase().indexOf(digitado.toUpperCase()) !== -1)) {
                    return true;
                }
            }
            return false;
        });
    }

}
