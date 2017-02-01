import { Racao } from './racao';

export class RacaoLote {
    id: number;
    numero: number;
    dataLote: Date;
    dataValidade: Date;
    valor: number;
    valorVenda: number;
    quantidade: number;
    racao: Racao;

}
