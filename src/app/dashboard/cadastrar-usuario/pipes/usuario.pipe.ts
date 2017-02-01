import { Usuario } from './../../../shared/entity/authority/usuario';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroPorUsuario'
})

export class FiltroPorUsuario implements PipeTransform {

    transform(usuarios: Usuario[], digitado: string) {
        if (!digitado) {
            return usuarios;
        }

        return usuarios.filter((item: any) => {
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
