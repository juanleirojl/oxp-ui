export enum Status {
Ativo = 'A',
Inativo = 'I'
}

export namespace Status {

    export function values() {
      return Object.keys(Status).filter(
        (type) => isNaN(<any>type) && type !== 'values')
        .map(key => ({value: Status[key], name: key}));
    }
  }
