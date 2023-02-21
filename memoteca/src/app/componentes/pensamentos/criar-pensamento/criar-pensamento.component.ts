import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento ={
    conteudo:'',
    autoria: '',
    modelo: 'modelo1'
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private service: PensamentoService,
      private router: Router){}


  criarPensamento(){
    this.service.criar(this.pensamento).subscribe(()=>{
      this.router.navigate(['/listarPensamento'])
    })

  }
  cancelar(){
    this.router.navigate(['/listarPensamento'])

  }

}
