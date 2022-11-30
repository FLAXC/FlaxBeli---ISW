import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosAllComponent } from './productos-all/productos-all.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'productos/all', component: ProductosAllComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado']
  }},
  {path:'productos/create',component: ProductoFormComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado']
  }},
  {path:'productos/update/:id',component: ProductoFormComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado']
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
