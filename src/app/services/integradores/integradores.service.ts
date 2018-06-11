import { Injectable } from '@angular/core';
import { Integrador } from '../../models/integrador.model';
import { IntegradoresInterface } from './integradores.interface';
import { MessageService } from '../message.service';
import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OXP_API } from '../../utils/oxp.api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class IntegradoresService implements IntegradoresInterface {

  url_integradores: string;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private route: Router) {
    this.url_integradores = `${OXP_API}/integradores`;
  }

  findAll() {
    return this.http.get<Integrador[]>(this.url_integradores).
      pipe(
        map(dados => dados.map(obj => new Integrador(obj))),
      // catchError(this.handleError2)
    );
  }
  findById(id: string) {
    return this.http.get<Integrador>(this.url_integradores + '/' + id). // `${OXP_API}/${id}`).
      pipe(
        map(retorno => new Integrador(retorno)),
      // catchError(this.handleError2)
    );
  }
  save(integrador: Integrador) {
    if (integrador.id != null) {
      return this.http.put<Integrador>(this.url_integradores + '/' + integrador.id, integrador, httpOptions).
        pipe(
        //  catchError(this.handleError2)
        );
    } else {
      return this.http.post<Integrador>(this.url_integradores, integrador, httpOptions);
    }
  }
}
