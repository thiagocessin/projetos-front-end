import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path:'categories',
   loadChildren: () => import('./pages/categories/categories.module').then(m=> m.CategoriesModule)
  }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{


}
