import { Component, OnInit, ViewChild } from '@angular/core';
import { Integrador } from '../../models/integrador.model';
import { IntegradoresService } from '../../services/integradores/integradores.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../utils/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-integradores-cadastro',
  templateUrl: './integradores-cadastro.component.html',
  styleUrls: ['./integradores-cadastro.component.css']
})
export class IntegradoresCadastroComponent implements OnInit {

  integrador: Integrador;

  @ViewChild('form')
  form: NgForm;
  constructor(
    private integradorService: IntegradoresService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.integrador = new Integrador();

    const id: string = this.router.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }
  }

  save() {
    this.integradorService.save(this.integrador).subscribe(response => {
      this.integrador = new Integrador();

      const integradorRetorno: Integrador = response;
      this.form.resetForm();
      this.messageService.addSuccess(`Registro ${integradorRetorno.nome} salvo com sucesso`);
      this.route.navigate(['/integradores']);
    }, error => {
      this.errorHandler.handle(error);
      this.messageService.addErrors(error);
    }
    );
  }

  findById(id: string) {
      this.integradorService.findById(id).subscribe(response => {
      this.integrador = response;
    },
    error => {
      this.errorHandler.handle(error);
      this.messageService.addErrors(error);
    });
  }


  isNovo(): Boolean {
    if (this.integrador === null || this.integrador.id === undefined || this.integrador.id === null) {
      return true;
    }
    return false;
  }

}
