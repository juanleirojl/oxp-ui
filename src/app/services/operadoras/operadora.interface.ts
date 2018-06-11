import { Operadora } from '../../models/operadora.model';

export interface OperadoraInterface {

    findAll();

    findById(id: string);

    save(operadora: Operadora);
}
