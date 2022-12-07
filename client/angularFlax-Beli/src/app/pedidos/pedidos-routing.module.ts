import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosOrdenComponent } from './pedidos-orden/pedidos-orden.component';
import { PedidosProductosComponent } from './pedidos-productos/pedidos-productos.component';
import { PedidosFacturacionComponent } from './pedidos-facturacion/pedidos-facturacion.component';
import { ReportePdfComponent } from './reporte-pdf/reporte-pdf.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { PedidosFacturaClienteComponent } from './pedidos-factura-cliente/pedidos-factura-cliente.component'; 
const routes: Routes = [
  {
    path: 'pedidos/all',
    component: PedidosAllComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador', 'Empleado'],
    },
  },
  {
    path: 'pedidos/orden',
    component: PedidosOrdenComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador', 'Empleado', 'Cliente'],
    },
  },
  {
    path: 'pedidos/cliente/:id',
    component: PedidosClienteComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['Administrador', 'Empleado', 'Cliente'],
    },
  },
  { path: 'pedidos/productos', component: PedidosProductosComponent },
  { path: 'pedidos/orden/:id', component: PedidosOrdenComponent },
  { path: 'pedidos/facturacion', component: PedidosFacturacionComponent },
  { path: 'pedidos/facturacionCliente', component: PedidosFacturaClienteComponent  },
  {
    path: 'pedido/rGrafico',
    component: ReporteGraficoComponent,
  },
  {
    path: 'pedido/rPDF',
    component: ReportePdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosRoutingModule {}
