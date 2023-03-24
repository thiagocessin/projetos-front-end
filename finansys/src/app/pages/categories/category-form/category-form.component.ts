import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Category } from "../shared/category.model";

import { switchMap } from 'rxjs/operators';

import * as toastr from "toastr";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked{

  currentAction: string | undefined;
  categoryForm!: FormGroup;
  pageTitle: string | undefined;
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }


  ngAfterContentChecked() {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.

    this.setPageTitle();

  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == 'new'){
      this.createCategory();
    }else{
      this.updateCategory();
    }

  }


  //private methods
  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == 'new')
      this.currentAction='new'
    else
      this.currentAction = 'edit'

  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name:[null,[Validators.required, Validators.minLength(2)]],
      description:[null]
    })
  }

  private loadCategory(){
    if (this.currentAction == 'edit') {

        this.route.paramMap.pipe(
          switchMap(params => this.categoryService.getById(Number(params.get('id'))))
        )
        .subscribe((category) => {
            this.category = category;
            this.categoryForm?.patchValue(category)// binds loaded category data to CategoryForm
          },
          (error) => alert('Ocorreu um erro no servidor')
        )
    }
  }

  private setPageTitle(){
    if(this.currentAction== 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'

    else{
      const categoryName = this.category.name || ''
      this.pageTitle='Editando Categoria: '+ categoryName
    }
  }

  private createCategory(){
    //cria um obj category novo e atribui os valores do form
    const category: Category = Object.assign(new Category(), this.categoryForm.value)

    this.categoryService.create(category).subscribe(
      newCategory => this.actionsForSuccess(newCategory),
      error => this.actionsForError(error)
    )
  }

  private updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value)

    this.categoryService.update(category).subscribe(
      newCategory => this.actionsForSuccess(newCategory),
      error => this.actionsForError(error)
    )

  }

  private actionsForSuccess(newCategory: Category){
    toastr.success("Solicitação processada com sucesso!")
                                            //não adicionar no histórico de navegação do navegador
    this.router.navigateByUrl("categories", {skipLocationChange:true})

    /*.then(
      ()=> this.router.navigate(["categories",newCategory.id,"edit"])
    )*/

  }
  private actionsForError(error:any){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!")

    this.submittingForm = false

    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor tente mais tarde."]
    }
  }

}
