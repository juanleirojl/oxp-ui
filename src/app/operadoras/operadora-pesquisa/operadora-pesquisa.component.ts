import { Component, OnInit } from '@angular/core';
import { Operadora } from '../../models/operadora.model';
import { MessageService } from '../../services/message.service';
import { ErrorHandlerService } from '../../utils/error-handler.service';
import { OperadoraService } from '../../services/operadoras/operadora.service';
import { Status } from '../../models/enums/status.enum';

@Component({
  selector: 'app-operadora-pesquisa',
  templateUrl: './operadora-pesquisa.component.html',
  styleUrls: ['./operadora-pesquisa.component.css']
})
export class OperadoraPesquisaComponent implements OnInit {

  operadoras: Array<Operadora>;
  message: string;

  totalOperadoras: number;
  totalContatosAtivos: number;

  constructor(
    private operadoraService: OperadoraService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.operadoraService.findAll()
    .subscribe(
      dados => {
        this.operadoras = dados;
        this.totalOperadoras = this.operadoras.length;
        this.totalContatosAtivos = 0;

        this.operadoras.forEach(integrador => {
            integrador.contatos.forEach(contato => {
              if (contato.status != null && contato.status === Status.Ativo) {
                this.totalContatosAtivos ++;
              }
            });
        });

        console.log(this.operadoras);
      },
      error => this.errorHandler.handle(error)
    );
  }

}
