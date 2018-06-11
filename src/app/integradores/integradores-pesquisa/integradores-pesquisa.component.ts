import { Component, OnInit } from '@angular/core';
import { IntegradoresService } from '../../services/integradores/integradores.service';
import { MessageService } from '../../services/message.service';
import { Integrador } from '../../models/integrador.model';
import { ErrorHandlerService } from '../../utils/error-handler.service';
import { Status } from '../../models/enums/status.enum';

@Component({
  selector: 'app-integradores-pesquisa',
  templateUrl: './integradores-pesquisa.component.html',
  styleUrls: ['./integradores-pesquisa.component.css']
})
export class IntegradoresPesquisaComponent implements OnInit {

  integradores: Array<Integrador>;
  message: string;

  totalIntegradores: number;
  totalContatosAtivos: number;

  constructor(
    private integradorService: IntegradoresService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.integradorService.findAll()
    .subscribe(
      dados => {
        this.integradores = dados;
        this.totalIntegradores = this.integradores.length;
        this.totalContatosAtivos = 0;

        this.integradores.forEach(integrador => {
            integrador.contatos.forEach(contato => {
              if (contato.status != null && contato.status === Status.Ativo) {
                this.totalContatosAtivos ++;
              }
            });
        });

        console.log(this.integradores);
      },
      error => this.errorHandler.handle(error)
    );
  }

}
