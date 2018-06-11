import { Status } from './enums/status.enum';
import { Contato } from './contato.model';

export class Integrador {

    id: number;
    nome: string;
    apelido: string;
    cnpj: string;
   // dataAlteracao: Date;
   // nomeUltimoUsuario: string;

    contatos: Array<Contato>;

    constructor(json?: any) {
        if (json != null) {
            this.id = json.id;
            this.nome = json.nome;
            this.cnpj = json.cnpj;
            this.apelido = json.apelido;
            // this.nomeUltimoUsuario = json.status;
            // this.dataAlteracao = json.dataAlteracao;

            if (json.contatos != null) {
                this.contatos = Contato.toArray(json.contatos);
            }
        }
    }

    static toArray(array: Array<Integrador>): Array<Integrador> {
        return array.map(obj => new Integrador(obj));
    }
}
