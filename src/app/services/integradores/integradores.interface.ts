import { Integrador } from '../../models/integrador.model';

export interface IntegradoresInterface {

    findAll();

    findById(id: string);

    save(integrador: Integrador);
}
