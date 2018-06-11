import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { UsuarioPesquisaComponent } from './usuarios/usuario-pesquisa/usuario-pesquisa.component';
import { BarraNavegacaoComponent } from './layout/barra-navegacao/barra-navegacao.component';
import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { IntegradoresPesquisaComponent } from './integradores/integradores-pesquisa/integradores-pesquisa.component';
import { IntegradoresCadastroComponent } from './integradores/integradores-cadastro/integradores-cadastro.component';
import { OperadoraPesquisaComponent } from './operadoras/operadora-pesquisa/operadora-pesquisa.component';
import { OperadoraCadastroComponent } from './operadoras/operadora-cadastro/operadora-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    UsuarioPesquisaComponent,
    BarraNavegacaoComponent,
    UsuarioCadastroComponent,
    NotFoundComponent,
    IntegradoresPesquisaComponent,
    IntegradoresCadastroComponent,
    OperadoraPesquisaComponent,
    OperadoraCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
