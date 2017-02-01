import { Pessoa } from './../pessoa/pessoa';
import { Raca } from './raca';

export class Pet {
    id: number;
    nome: string;
    dtNacimento: Date;
    raca: Raca;
    pessoa: Pessoa;
}
