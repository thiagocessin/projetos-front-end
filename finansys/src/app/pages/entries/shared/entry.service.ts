import { Entry } from './entry.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private http: HttpClient) {

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
