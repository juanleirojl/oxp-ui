import { Permissao } from './permissao.model';

export class Grupo {

    id: number;
    nome: string;
    descricao: string;

    checked: boolean;

    permissoes: Array<Permissao>;

    constructor(json?: any) {
        if (json != null) {
            this.id = json.id;
            this.nome = json.nome;
            this.descricao = json.descricao;
            if (json.permissoes != null) {
                this.permissoes = Permissao.toArray(json.permissoes);
            }
        }
    }

    static toArray(array: Array<Grupo>): Array<Grupo> {
        return array.map(obj => new Grupo(obj));
    }
}
