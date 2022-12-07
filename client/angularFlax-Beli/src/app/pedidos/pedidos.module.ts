import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosOrdenComponent } from './pedidos-orden/pedidos-orden.component';
import { PedidosProductosComponent } from './pedidos-productos/pedidos-productos.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PedidosClienteComponent } from './pedidos-cliente/pedidos-cliente.component';
import { PedidosFacturacionComponent } from './pedidos-facturacion/pedidos-facturacion.component';
import { ReportePdfComponent } from './reporte-pdf/reporte-pdf.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { PedidosFacturaClienteComponent } from './pedidos-factura-cliente/pedidos-factura-cliente.component'; 
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [PedidosAllComponent, PedidosDetailComponent, PedidosOrdenComponent, PedidosProductosComponent, PedidosClienteComponent, PedidosFacturacionComponent, ReportePdfComponent, ReporteGraficoComponent, PedidosFacturaClienteComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatOptionModule ,
    ReactiveFormsModule

  ]
})
export class PedidosModule { }
