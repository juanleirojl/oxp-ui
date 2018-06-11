import { Component, OnInit, ViewChild } from '@angular/core';
import { Integrador } from '../../models/integrador.model';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../utils/error-handler.service';
import { NgForm } from '@angular/forms';
import { OperadoraService } from '../../services/operadoras/operadora.service';
import { Operadora } from '../../models/operadora.model';
import { Status } from '../../models/enums/status.enum';

@Component({
  selector: 'app-operadora-cadastro',
  templateUrl: './operadora-cadastro.component.html',
  styleUrls: ['./operadora-cadastro.component.css']
})
export class OperadoraCadastroComponent implements OnInit {

  operadora: Operadora;

  statusOperadora = Status;

  @ViewChild('form')
  form: NgForm;
  constructor(
    private operadoraService: OperadoraService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.operadora = new Operadora();
    this.operadora.status = Status.Ativo;

    const id: string = this.router.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }
  }

  save() {
    this.operadoraService.save(this.operadora).subscribe(response => {
      this.operadora = new Operadora();

      const operadoraRetorno: Operadora = response;
      this.form.resetForm();
      this.messageService.addSuccess(`Registro ${operadoraRetorno.nome} salvo com sucesso`);
      this.route.navigate(['/operadoras']);
    }, error => {
      this.errorHandler.handle(error);
      this.messageService.addErrors(error);
    }
    );
  }

  findById(id: string) {
      this.operadoraService.findById(id).subscribe(response => {
      this.operadora = response;
    },
    error => {
      this.errorHandler.handle(error);
      this.messageService.addErrors(error);
    });
  }


  isNovo(): Boolean {
    if (this.operadora === null || this.operadora.id === undefined || this.operadora.id === null) {
      return true;
    }
    return false;
  }

}
