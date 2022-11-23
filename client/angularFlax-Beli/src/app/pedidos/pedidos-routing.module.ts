import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosOrdenComponent } from './pedidos-orden/pedidos-orden.component';
import { PedidosProductosComponent } from './pedidos-productos/pedidos-productos.component';



const routes: Routes = [
  {path:'pedidos/all', component: PedidosAllComponent},
  {path:'pedidos/orden', component: PedidosOrdenComponent},
  {path:'pedidos/productos', component: PedidosProductosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
