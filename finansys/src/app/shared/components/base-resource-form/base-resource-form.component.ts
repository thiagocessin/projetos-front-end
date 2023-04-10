import { OnInit, AfterContentChecked, Injector, Component, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { switchMap } from 'rxjs/operators';

import * as toastr from "toastr";
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';


@Directive()
export abstract class BaseResourceFormComponent <T extends BaseResourceModel> implements OnInit, AfterContentChecked{

  currentAction: string | undefined;
  resourceForm!: FormGroup;
  pageTitle: string | undefined;
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(protected injector: Injector,
              public resource: T,
              protected resourceService: BaseResourceService<T>,
              protected jsonDataToResourceFn: (jsonData:any)=> T){
              this.route = this.injector.get(ActivatedRoute)
              this.router = this.injector.get(Router)
              this.formBuilder = this.injector.get(FormBuilder)

    }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();

  }


  ngAfterContentChecked() {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new'){
      this.createResource();
    }else{
      this.updateResource();
    }

  }


  //private methods
  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new')
      this.currentAction='new'
    else
      this.currentAction = 'edit'

  }


  protected loadResource(){
    if (this.currentAction == 'edit') {

        this.route.paramMap.pipe(
          switchMap(params => this.resourceService.getById(Number(params.get('id'))))
        )
        .subscribe((resource) => {
            this.resource = resource;
            this.resourceForm?.patchValue(resource)// binds loaded resource data to resourceForm
          },
          (error) => alert('Ocorreu um erro no servidor')
        )
    }
  }

  protected setPageTitle(){
    if(this.currentAction== 'new')
      this.pageTitle = this.creationPageTitle()

    else{
      this.pageTitle= this.editionPageTitle()
    }
  }

  protected creationPageTitle(): string{
    return "Novo"
  }
  protected editionPageTitle(): string{
    return "Edição"
  }

  protected createResource(){
    //cria um obj category novo e atribui os valores do form
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

    this.resourceService.create(resource).subscribe(
      newResource => this.actionsForSuccess(newResource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

    this.resourceService.update(resource).subscribe(
      newResource => this.actionsForSuccess(newResource),
      error => this.actionsForError(error)
    )

  }


  protected actionsForSuccess(newResource: T){
    toastr.success("Solicitação processada com sucesso!")

    const baseComponentPath = this.route.snapshot.parent?.url[0].path

    //não adicionar no histórico de navegação do navegador
    this.router.navigateByUrl(baseComponentPath ? baseComponentPath : 'categories', {skipLocationChange:true})

    //.then(
    //  ()=> this.router.navigate(["categories",newCategory.id,"edit"])
    //)

  }


  protected actionsForError(error:any){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!")

    this.submittingForm = false

    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor tente mais tarde."]
    }
  }

  protected abstract buildResourceForm(): void;

}
