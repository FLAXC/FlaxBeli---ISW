import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService, ItemCart  } from 'src/app/share/cart-service.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';
import { ProductosDetailComponent } from 'src/app/productos/productos-detail/productos-detail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-pedidos-orden',
  templateUrl: './pedidos-orden.component.html',
  styleUrls: ['./pedidos-orden.component.css']
})
export class PedidosOrdenComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  displayedColumnsProducts: string[] = ['nombre', 'descripcion','precio',"accionesCompra"];
  dataSource = new MatTableDataSource<any>();
  dataSourceProducts = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private dialog:MatDialog,
    private notificacion:NotificacionService,
    ){
      this.listaProductos();
     }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartService.getTotal();
    this.listaProductos();
  }

  listaProductos() {
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSourceProducts= new MatTableDataSource(this.datos);
        this.dataSourceProducts.sort = this.sort;
        this.dataSourceProducts.paginator = this.paginator;
      });
  }

  detalleProducto(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(ProductosDetailComponent ,dialogConfig);
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

   comprar(id:number){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar producto obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Orden',
        'Producto: '+data.nombre+' agregado a la orden',
        TipoMessage.success
      );
    });
  }
}
