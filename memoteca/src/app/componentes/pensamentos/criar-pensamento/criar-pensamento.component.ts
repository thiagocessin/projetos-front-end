import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento ={
    id: 1,
    conteudo:'Teste de angular',
    autoria: 'Dev',
    modelo: 'modelo1'
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(){}


  criarPensamento(){
    alert("teste")

  }
  cancelar(){
    alert("teste")

  }

}
