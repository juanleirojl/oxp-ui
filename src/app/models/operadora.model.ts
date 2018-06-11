import { Status } from './enums/status.enum';
import { Contato } from './contato.model';

export class Operadora {

    id: number;
    nome: string;
    cnpj: string;
   // dataAlteracao: Date;
   // nomeUltimoUsuario: string;

   status: Status;

    contatos: Array<Contato>;

    constructor(json?: any) {
        if (json != null) {
            this.id = json.id;
            this.nome = json.nome;
            this.cnpj = json.cnpj;
            this.status = json.status;
            // this.nomeUltimoUsuario = json.status;
            // this.dataAlteracao = json.dataAlteracao;

            if (json.contatos != null) {
                this.contatos = Contato.toArray(json.contatos);
            }
        }
    }

    static toArray(array: Array<Operadora>): Array<Operadora> {
        return array.map(obj => new Operadora(obj));
    }
}
