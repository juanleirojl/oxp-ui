import { Injectable } from '@angular/core';
import { Operadora } from '../../models/Operadora.model';
import { MessageService } from '../message.service';
import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OXP_API } from '../../utils/oxp.api';
import { OperadoraInterface } from './operadora.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class OperadoraService implements OperadoraInterface {

  url_operadoras: string;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private route: Router) {
    this.url_operadoras = `${OXP_API}/operadoras`;
  }

  findAll() {
    return this.http.get<Operadora[]>(this.url_operadoras).
      pipe(
        map(dados => dados.map(obj => new Operadora(obj))),
      // catchError(this.handleError2)
    );
  }
  findById(id: string) {
    return this.http.get<Operadora>(this.url_operadoras + '/' + id). // `${OXP_API}/${id}`).
      pipe(
        map(retorno => new Operadora(retorno)),
      // catchError(this.handleError2)
    );
  }
  save(operadora: Operadora) {
    if (operadora.id != null) {
      return this.http.put<Operadora>(this.url_operadoras + '/' + operadora.id, operadora, httpOptions).
        pipe(
        //  catchError(this.handleError2)
        );
    } else {
      return this.http.post<Operadora>(this.url_operadoras, operadora, httpOptions);
    }
  }
}
