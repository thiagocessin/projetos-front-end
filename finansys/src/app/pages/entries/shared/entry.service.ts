import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private http: HttpClient,
              private categoryService: CategoryService) {

  }

  getAll(): Observable<Entry[]>{

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number) : Observable<Entry>{
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )

  }

  create(entry: Entry): Observable<Entry>{

    //uso somente pelo mock do backend
    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      mergeMap(category => {
        entry.category = category

        return this.http.post(this.apiPath,entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )




  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`

    return this.categoryService.getById(Number(entry.categoryId)).pipe(

        mergeMap(category=>{
          entry.category = category

          return this.http.put(url, entry).pipe(
            catchError(this.handleError),
            map(()=>entry)
          )

        })
      )

  }

  /* usar com backEnd real
  create(entry: Entry): Observable<Entry>{

    return this.http.post(this.apiPath,entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )

  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(()=>entry)
    )

  }
*/
  delete(id: number) : Observable<any>{

    const url = `${this.apiPath}/${id}`

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(()=> null)
    )
  }


  //PRIVATE METHODS

  //recebe o retorno do servidor e converte para o tipo Entry
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = []
    jsonData.forEach((element)=> entries.push(Object.assign(new Entry(), element)))

    return entries;
  }
  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any>{
    console.log("Erro a requisição => ", error)
    return throwError(error)
  }

}
