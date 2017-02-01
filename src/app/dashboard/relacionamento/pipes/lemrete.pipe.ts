import { Lembrete } from './../../../shared/entity/relacionamento/lembrete';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorClienteLembrete'
})

export class FiltroPorClienteLembrete implements PipeTransform {

    transform(lembretes: Lembrete[], digitado: string) {
        if (!digitado) {
            return lembretes;
        }

        return lembretes.filter((item) => {
            return item.pessoa.nome.toUpperCase().includes(digitado.toUpperCase());
        });
    }

}
