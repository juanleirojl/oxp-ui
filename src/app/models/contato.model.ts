import { Status } from './enums/status.enum';
import { TipoContato } from './enums/tipoContato.enum';
import { Integrador } from './integrador.model';
import { Operadora } from './operadora.model';

export class Contato {

    id: number;
    nome: string;
    email: string;
    telefones: string;

    status: Status;
    tipoContato: TipoContato;
   // dataAlteracao: Date;
   // nomeUltimoUsuario: string;

    operadora: Operadora;
    integrador: Integrador;


    constructor(json?: any) {
        if (json != null) {
            this.id = json.id;
            this.nome = json.nome;
            // this.nomeUltimoUsuario = json.status;
            // this.dataAlteracao = json.dataAlteracao;

            if (json.operadora != null) {
                this.operadora = new Operadora(json.operadora);
            }

            if (json.integrador != null) {
                this.integrador = new Integrador(json.integrador);
            }
        }
    }

    static toArray(array: Array<Contato>): Array<Contato> {
        return array.map(obj => new Contato(obj));
    }
}
