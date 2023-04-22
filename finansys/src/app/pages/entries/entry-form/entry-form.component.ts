import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { EntryService } from './../shared/entry.service';
import { Component, Directive, Injector, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";

import { Entry } from "../shared/entry.model";

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  categories: Array<Category> = [];

  imaskConfig = {
    mask: Number,
    scale:2,
    thousandsSeparator:'',
    padFractionalZeros:true,//completa com zeros
    normalizeZeros:true,
    radix:','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(protected entryService: EntryService,
              protected categoryservice: CategoryService,
              protected override injector: Injector){
                super(injector, new Entry(), entryService, Entry.fromJson)
              }

  override ngOnInit(): void {
   this.loadCategories();
   super.ngOnInit()
  }


  protected override buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name:[null,[Validators.required, Validators.minLength(2)]],
      description:[null],
      type:['expense', [Validators.required]],
      amount:[null, [Validators.required]],
      date:[null, [Validators.required]],
      paid:[true, [Validators.required]],
      categoryId:[null, [Validators.required]],
    })
  }

  get typeOptions(): Array<any>{

    return Object.entries(Entry.types).map(
      ([value, text])=>{
        return {
          value: value,
          text: text,
        }
      }
    )
  }

  private loadCategories(){

    this.categoryservice.getAll().subscribe(
      (categories)=>{
        this.categories = categories
      }
    )

  }

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento"
}

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || ''

    return "Editando Lançamento: "+ resourceName
  }



}
