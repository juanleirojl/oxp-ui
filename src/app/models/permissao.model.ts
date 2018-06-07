export class Permissao {

    id: number;
    nome: string;
    descricao: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    static toArray(array: Array<any>): Array<Permissao> {
        return array.map(obj => new Permissao(obj));
    }
}
