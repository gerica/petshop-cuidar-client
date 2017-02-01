import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nomeMaximo'
})

export class ProdutoNomePipe implements PipeTransform {

    transform(item: string) {
        if (!item) {
            return item;
        }

        return item = item.length > 20 ? item.substr(0, 20) + '...' : item;

    }

}
