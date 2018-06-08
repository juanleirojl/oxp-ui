import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioPesquisaComponent } from './usuarios/usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { NotFoundComponent } from './error/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuarioPesquisaComponent },
  { path: 'usuarios/novo', component: UsuarioCadastroComponent },
  { path: 'usuarios/:id', component: UsuarioCadastroComponent },
  { path: '404', component: NotFoundComponent},
   { path: '**', redirectTo: '/404' }
];

// <a *ngFor="let hero of heroes" class="col-1-4"
//    routerLink="/detail/{{hero.id}}">

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
