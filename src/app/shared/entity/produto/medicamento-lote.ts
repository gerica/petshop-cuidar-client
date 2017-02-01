import { Medicamento } from './medicamento';

export class MedicamentoLote {
    id: number;
    numero: number;
    dataLote: Date;
    dataValidade: Date;
    valor: number;
    valorVenda: number;
    quantidade: number;
    medicamento: Medicamento;

}
