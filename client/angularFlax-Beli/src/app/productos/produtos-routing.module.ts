import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';

const routes: Routes = [
  {path:'productos/all', component: ProductosAllComponent},
  {path:'productos/create',component: ProductoFormComponent},
  {path:'productos/update/:id',component: ProductoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
