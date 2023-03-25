import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path:'categories',
   loadChildren: () => import('./pages/categories/categories.module').then(m=> m.CategoriesModule)
  },
  {path:'entries',
   loadChildren: () => import('./pages/entries/entries.module').then(m=> m.EntriesModule)
  },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{


}
