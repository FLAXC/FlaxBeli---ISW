import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos-orden',
  templateUrl: './pedidos-orden.component.html',
  styleUrls: ['./pedidos-orden.component.css']
})
export class PedidosOrdenComponent implements OnInit {
  
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  dataSource = new MatTableDataSource<any>();



  constructor(
  
    ){ }

  ngOnInit(): void {
  }

}
