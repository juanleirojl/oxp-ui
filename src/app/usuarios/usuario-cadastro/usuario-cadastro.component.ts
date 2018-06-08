import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Status } from '../../models/enums/status.enum';
import { Grupo } from '../../models/grupo.model';
import { GrupoService } from '../../services/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario: Usuario;
  grupos: Array<Grupo>;

  statusUsuario = Status;

  @ViewChild('form')
  form: NgForm;
  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private grupoService: GrupoService,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.status = Status.Ativo;
    this.usuario.grupos = new Array<Grupo>();

    const id: string = this.router.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    } else {
      this.findAllGrupos();
    }
  }

  isNovo(): Boolean {
    if (this.usuario === null || this.usuario.id === undefined || this.usuario.id === null) {
      return true;
    }
    return false;
  }

  save() {
    this.usuarioService.save(this.usuario).subscribe(response => {
      this.usuario = new Usuario();

      const usuarioRetorno: Usuario = response;
      this.form.resetForm();
      this.messageService.addSuccess(`Registro ${usuarioRetorno.login} salvo com sucesso`);
      this.route.navigate(['/usuarios']);
    }, err => {
      this.messageService.addErrors(err);
    }
    );
  }

  updateSelected(event, grupo: Grupo, i) {
    if (grupo.checked) {
      if (this.usuario.grupos.indexOf(i) < 0) {
        this.usuario.grupos.push(grupo);
      }
    } else {
      if (this.usuario.grupos.indexOf(i) >= -1) {
        this.removeGrupo(grupo);
      }
    }
  }

  removeGrupo(grupo) {
    this.usuario.grupos.forEach((item, index) => {
      if (item.id === grupo.id) {
        this.usuario.grupos.splice(index, 1);
      }
    });
  }

  preencheUsuarioComGrupos(usuario: Usuario) {
    if (this.grupos != null) {
      this.grupos.forEach(g => {
        usuario.grupos.forEach(gr => {
          if (gr.id != null && gr.id === g.id) {
            gr.checked = true;
            g.checked = true;
          }
        });
      });
    }
  }

  findById(id: string) {
    return forkJoin(
      this.grupoService.findAll(),
      this.usuarioService.findById(id)
    ).subscribe(resultado => {
      this.grupos = resultado[0];
      this.usuario = resultado[1];
      this.preencheUsuarioComGrupos(this.usuario);
    },
    error => this.usuarioService.handleError2);
  }


  findAllGrupos() {
    this.grupoService.findAll()
      .subscribe(
        dados => this.grupos = dados,
        () => {
          console.log(this.grupos);
        }
      );
  }
}
