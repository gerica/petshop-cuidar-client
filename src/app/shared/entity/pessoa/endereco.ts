import { Cidade } from './../utils/cidade';

export class Endereco {
    id: number;
    cep: string;
    logradouro: string;
    numero: number;
    complemento: number;
    bairro: number;
    cidade: Cidade;
    // pessoa: Pessoa;
}
