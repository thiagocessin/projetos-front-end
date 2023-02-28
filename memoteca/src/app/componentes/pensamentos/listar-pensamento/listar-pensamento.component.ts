
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';


@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})

export class ListarPensamentoComponent implements OnInit{

  listaPensamentos: Pensamento[] = [];
  paginaAtual:number = 1
  haMaisPensamentos:boolean = true
  filtro: string = ''

  constructor(private service: PensamentoService){

  }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe(lista=>
      this.listaPensamentos = lista
    )
  }


  carregarMaisPensamentos(){

    this.service.listar(++this.paginaAtual,this.filtro).subscribe((listaRetorno)=>{
      //... adiciona a lista passada ao conteúdo da lista atual
      this.listaPensamentos.push(...listaRetorno)

      if(!listaRetorno.length){
        this.haMaisPensamentos = false
      }

    })

  }

  pesquisarPensamentos(){

    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaRetorno)=>{
      this.listaPensamentos = listaRetorno;
      }
    )

  }





}
