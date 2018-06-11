export enum TipoContato {
Integrador = 'I',
Operadora = 'O'
}

export namespace TipoContato {

    export function values() {
      return Object.keys(TipoContato).filter(
        (type) => isNaN(<any>type) && type !== 'values')
        .map(key => ({value: TipoContato[key], name: key}));
    }
  }
