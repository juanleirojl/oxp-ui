import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { OXP_API } from '../utils/oxp.api';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { GrupoService } from './grupo.service';
import {forkJoin} from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url_usuarios: string;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private grupoService: GrupoService,
    private route: Router) {
    this.url_usuarios = `${OXP_API}/usuarios`;
  }

  findAll(page: number, count: number): Observable<Usuario[]> {
    // this.messageService.addSuccess('Pesquisando usuários');
    const parametros = new HttpParams()
      .set('_limit', count.toString())
      .set('_page', page.toString());

    let params = new HttpParams();
    params = params.append('_page', page.toString());
    params = params.append('_limit', count.toString());

   // return this.http.get<Usuario[]>(`${OXP_API}/usuarios`, {params: parametros});
   return this.http.get<Usuario[]>(this.url_usuarios).
         pipe(
          map(dados => dados.map(obj => new Usuario(obj))),
          catchError(this.handleError2)
        );
  }

 findById(id: string) {
    return this.http.get<Usuario>(this.url_usuarios + '/' + id). // `${OXP_API}/${id}`).
    pipe(
      map(retorno => new Usuario(retorno)),
      catchError(this.handleError2)
    );
  }

  save(usuario: Usuario) {
    if (usuario.id != null) {
      return this.http.put<Usuario>(this.url_usuarios + '/' + usuario.id, usuario, httpOptions).
      pipe(
        catchError(this.handleError2)
      );
    } else {
      return this.http.post<Usuario>(this.url_usuarios, usuario, httpOptions);
    }
  }

  findAll2(): Observable <Usuario[]> {
    const listaContatos =  this.http.get<Usuario[]>(this.url_usuarios).
    pipe(
      map(dados => dados.map(obj => new Usuario(obj))),
      catchError(this.handleError2)
    );

    return listaContatos;
  }

  public handleError2(error: any) {
    const errorMessage = (error.message) ? error.message :
    error.status ? `Status: ${error.status} - Msg: ${error.statusText}` : 'Erro no servidor';
    console.log(errorMessage);
    if (error.status === 401) {
      window.location.href = '/';
    }

    if (error.status === 404) {
      window.location.href = '/404';
    }

    return throwError(errorMessage);
}

public exibeErro(error: any) {
  const errorMessage = (error.message) ? error.message :
  error.status ? `Status: ${error.status} - Msg: ${error.statusText}` : 'Erro no servidor';

  if (error.status === '404') {
    this.route.navigate(['/404']);
  }
  console.log(errorMessage);
  if (error.status === 401) {
    window.location.href = '/';
  }

  return throwError(errorMessage);
}

public handleError(error: HttpErrorResponse) {
if (error.error instanceof ErrorEvent) {
  // A client-side or network error occurred. Handle it accordingly.
  console.error('An error occurred:', error.error.message);
} else {
  // The backend returned an unsuccessful response code.
  // The response body may contain clues as to what went wrong,
  console.error(
    `Backend returned code ${error.status}, ` +
    `body was: ${error.error}`);
}
// return an observable with a user-facing error message
return throwError(
  'Something bad happened; please try again later.');
}

}
