import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosOrdenComponent } from './pedidos-orden/pedidos-orden.component';



const routes: Routes = [
  {path:'pedidos/all', component: PedidosAllComponent},
  {path:'pedidos/orden', component: PedidosOrdenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
