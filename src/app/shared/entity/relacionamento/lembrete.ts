import { Usuario } from './../authority/usuario';
import { Pessoa } from './../pessoa/pessoa';

export class Lembrete {
    id: number;
    pessoa: Pessoa;
    usuario: Usuario;
    dtLembrete: Date;
    dtCadastro: Date;
    observacao: string;
    status: string;
}
