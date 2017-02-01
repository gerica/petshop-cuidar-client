import { Orcamento } from './../../../shared/entity/venda/orcamento';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorClienteOrcamento'
})

export class FiltroPorClienteOrcamento implements PipeTransform {

    transform(orcamentos: Orcamento[], digitado: string) {
        if (!digitado) {
            return orcamentos;
        }

        // return orcamentos.filter((item: any) => {
        //     for (let key in item) {
        //         if ((item[key] instanceof Pessoa) &&
        //             (item[key].nome.toUpperCase().indexOf(digitado.toUpperCase()) !== -1)) {
        //             return true;
        //         }
        //     }
        //     return false;
        // });

        return orcamentos.filter((item) => {
            return item.pessoa.nome.toUpperCase().includes(digitado.toUpperCase());
        });
    }

}
