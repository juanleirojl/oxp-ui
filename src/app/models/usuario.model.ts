import { Grupo } from './grupo.model';
import { Status } from './enums/status.enum';

export class Usuario {

    id: number;
    nome: string;
    login: string;
    status: Status;
    dataAlteracao: Date;
    nomeUltimoUsuario: string;

    grupos: Array<Grupo>;

    constructor(json?: any) {
        if (json != null) {
            this.id = json.id;
            this.nome = json.nome;
            this.login = json.login;
            this.status =  json.status;
            this.nomeUltimoUsuario = json.status;
            this.dataAlteracao = json.dataAlteracao;

            if (json.grupos != null) {
                this.grupos = Grupo.toArray(json.grupos);
            }
        }
    }

    static toArray(array: Array<Usuario>): Array<Usuario> {
        return array.map(obj => new Usuario(obj));
    }
}
