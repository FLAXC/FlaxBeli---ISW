import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService, ItemCart  } from 'src/app/share/cart-service.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';

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
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
    ){ }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartService.getTotal();
  }


  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden',
    'Cantidad actualizada',
    TipoMessage.success);
  }


  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden',
    'Producto eliminado',
    TipoMessage.warning);
  }

  registrarOrden() {
    if(this.cartService.getItems!=null){
     //Obtener todo lo necesario para crear la orden
     let itemsCarrito=this.cartService.getItems;
     let detalles=itemsCarrito.map(
       x=>({
         ['pedidoId']: x.idItem,
         ['cantidad']: x.cantidad
       })
     );
     //Datos para el API
     let infoOrden={
       'fechaOrden':new Date(this.fecha),
       'productos':detalles
     }
     this.gService
     .create('orden',infoOrden)
     .subscribe((respuesta:any)=>{
         this.noti.mensaje('Orden',
         'Orden registrada',
         TipoMessage.success);
         this.cartService.deleteCart();
         this.total=this.cartService.getTotal();
         console.log(respuesta);
       });
     
 
    }else{
     this.noti.mensaje('Orden',
     'Agregue productos a la orden',
     TipoMessage.warning);
    }
   }
}
