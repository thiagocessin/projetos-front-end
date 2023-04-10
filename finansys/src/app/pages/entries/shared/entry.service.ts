import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(protected override injector: Injector,
              private categoryService: CategoryService) {
      super("api/entries", injector, Entry.fromJson)
  }

  override create(entry: Entry): Observable<Entry>{

    //uso somente pelo mock do backend
    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      mergeMap(category => {
        entry.category = category
        return super.create(entry)
      })
    )




  }

  override update(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(Number(entry.categoryId)).pipe(

        mergeMap(category=>{
          entry.category = category

          return super.update(entry)

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

}
