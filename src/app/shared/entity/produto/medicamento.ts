import { MedicamentoTipoPet } from './medicamento-tipo-pet';

export class Medicamento {
    id: number;
    marca: string;
    nome: string;
    medicamentoTipoPet: MedicamentoTipoPet[];
    categoria: string;
    porte: string;
    faixaIdade: string;
}
