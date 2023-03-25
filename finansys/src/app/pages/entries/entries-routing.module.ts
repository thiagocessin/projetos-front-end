import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  {path:'', component: EntryListComponent},
  {path:':id/edit', component: EntryFormComponent},
  {path:'new', component: EntryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule {


}
