import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { MessageService } from '../../services/message.service';
import { Status } from '../../models/enums/status.enum';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  usuarios: Array<Usuario>;
  message: string;

  totalUsuarios: number;
  totalUsuariosAtivos: number;
  totalUsuariosInativos: number;

  constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll(1, 10)
    .subscribe(
      dados => {
        this.usuarios = dados;
        this.totalUsuarios = this.usuarios.length;
        this.totalUsuariosAtivos = this.usuarios.map(u => u.status).filter(s => s === Status.Ativo).length;
        this.totalUsuariosInativos = this.usuarios.map(u => u.status).filter(s => s === Status.Inativo).length;
      },
      error => console.log(error),
    );
  }
}
