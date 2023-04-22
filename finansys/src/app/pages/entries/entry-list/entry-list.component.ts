import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-form/base-resource-list/base-resource-list.component';
import { Component } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry>{

  constructor(private entryService: EntryService){
    super(entryService)
  }

}
