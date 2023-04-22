import { Directive, OnInit } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';


@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit{

  resources: T[] = []

  constructor(protected resourceService: BaseResourceService<T>){

  }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      resourcesList => this.resources = resourcesList,
      error=> alert('Erro ao carregar a lista')
    )

  }

  deleteResource(resource: T){

    const mustDelete = confirm('Deseja realmente excluir este item?')

    if(mustDelete){
      this.resourceService.delete(resource.id!).subscribe(
        ()=> this.resources = this.resources.filter(element  => element != resource),
        ()=> alert('Erro ao tentar excluir')
      )
    }

  }

}
