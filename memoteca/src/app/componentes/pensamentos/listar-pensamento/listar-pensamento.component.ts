import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent {

  listaPensamentos = [
    {

      conteudo:'Comunicacao entre componentes',
      autoria: 'Compomente pai',
      modelo:'modelo3'

    },
    {

      conteudo:'Comunicacao entre componentes',
      autoria: 'Compomente pai',
      modelo:'modelo1'

    },

    {

      conteudo:'Comunicacao entre componentes 2 Comunicacao entre componentes 2Comunicacao entre componentes 2 Comunicacao entre componentes 2Comunicacao entre componentes 2Comunicacao entre componentes 2Comunicacao entre componentes 2Comunicacao entre componentes 2Comunicacao entre componentes 2Comunicacao entre componentes 2',
      autoria: 'Autor 1',
      modelo:'modelo2'

    }
  ];


}
