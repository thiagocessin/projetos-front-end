import { Category } from './category.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  //private apiPath: string = "http://localhost:8080/categorias"

  constructor(protected override injector: Injector) {
    super("api/categories",injector);
  }
}
