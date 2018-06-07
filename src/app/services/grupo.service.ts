import { Injectable } from '@angular/core';
import { OXP_API } from '../utils/oxp.api';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Grupo } from '../models/grupo.model';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url_grupos: string;

  constructor(private messageService: MessageService, private http: HttpClient) {
    this.url_grupos = `${OXP_API}/grupos`;
  }

  findAll(): Observable<Grupo[]> {
   return this.http.get<Grupo[]>(this.url_grupos).
         pipe(
          map(dados => dados.map(obj => new Grupo(obj))),
          catchError(this.handleError2)
        );
  }


  private handleError2(error: any) {
    const errorMessage = (error.message) ? error.message :
    error.status ? `Status: ${error.status} - Msg: ${error.statusText}` : 'Erro no servidor';
    console.log(errorMessage);
    if (error.status === 401) {
      window.location.href = '/';
    }

    return throwError(errorMessage);
}
}
