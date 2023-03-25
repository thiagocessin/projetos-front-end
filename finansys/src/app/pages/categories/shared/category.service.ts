import { Category } from './category.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories"
  //private apiPath: string = "http://localhost:8080/categorias"

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Category[]>{

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number) : Observable<Category>{
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )

  }

  create(category: Category): Observable<Category>{

    console.log('ApiPATH: ', this.apiPath)
    return this.http.post(this.apiPath,category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )

  }

  update(category: Category): Observable<Category>{
    const url = `${this.apiPath}/${category.id}`

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(()=>category)
    )

  }

  delete(id: number) : Observable<any>{

    const url = `${this.apiPath}/${id}`

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(()=> null)
    )
  }


  //PRIVATE METHODS

  //recebe o retorno do servidor e converte para o tipo Category
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = []
    jsonData.forEach((element)=> categories.push(element as Category))

    return categories;
  }
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro a requisição => ", error)
    return throwError(error)
  }

}
