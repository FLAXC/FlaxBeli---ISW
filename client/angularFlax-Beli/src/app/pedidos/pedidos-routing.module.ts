import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosOrdenComponent } from './pedidos-orden/pedidos-orden.component';
import { PedidosProductosComponent } from './pedidos-productos/pedidos-productos.component';



const routes: Routes = [
  {path:'pedidos/all', component: PedidosAllComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado']
  }},
  {path:'pedidos/orden', component: PedidosOrdenComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado','Cliente']
  }},
  {path:'pedidos/productos', component: PedidosProductosComponent},
  {path:'pedidos/orden/:id', component: PedidosOrdenComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
