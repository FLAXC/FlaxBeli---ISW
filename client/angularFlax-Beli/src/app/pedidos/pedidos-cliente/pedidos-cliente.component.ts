import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';
import { ProductosDetailComponent } from 'src/app/productos/productos-detail/productos-detail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartUsuarioService } from 'src/app/share/cart-usuario.service';
@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad','notas', 'subtotal','acciones'];
  displayedColumnsProducts: string[] = ['nombre', 'descripcion','precio',"accionesCompra",'acciones'];
  dataSource = new MatTableDataSource<any>();
  dataSourceProducts = new MatTableDataSource<any>();
  datosDialog: any;
  idResta:any;
  constructor(
    private cartUsuarioService: CartUsuarioService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private dialog:MatDialog,
    private notificacion:NotificacionService,
    private activeRouter: ActivatedRoute,
    ){
     }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idResta=params['id'];
    });
    this.cartUsuarioService.currentDataCart$.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartUsuarioService.getTotal();
    this.listaProductos(this.idResta); 
  }

  obtenerNotas(item: any) {
    this.cartUsuarioService.addToCart(item);
    this.noti.mensaje('Pedido', 'Nota actualizada', TipoMessage.success);
  }

  listaProductos(id:number) {
    this.gService
      .get('restaurante/restaurante', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data.productos;
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
    this.cartUsuarioService.addToCart(item);
    this.total=this.cartUsuarioService.getTotal();
    this.noti.mensaje('Pedido',
    'Cantidad actualizada',
    TipoMessage.success);
  }


  eliminarItem(item: any) {
    this.cartUsuarioService.removeFromCart(item);
    this.total=this.cartUsuarioService.getTotal();
    this.noti.mensaje('Pedido',
    'Producto eliminado',
    TipoMessage.warning);
  }

  registrarOrden() {
    if(this.cartUsuarioService.getItems!=null){
     //Obtener todo lo necesario para crear la orden
     let itemsCarrito=this.cartUsuarioService.getItems;
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
     .create('pedido',infoOrden)
     .subscribe((respuesta:any)=>{
         this.noti.mensaje('Pedido',
         'Pedido registrada',
         TipoMessage.success);
         this.cartUsuarioService.deleteCart();
         this.total=this.cartUsuarioService.getTotal();
         console.log(respuesta);
       });
     
 
    }else{
     this.noti.mensaje('Pedido',
     'Agregue productos a al pedido',
     TipoMessage.warning);
    }
   }

   comprar(id:number){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar producto obtenido del API al carrito
      this.cartUsuarioService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Pedido',
        'Producto: '+data.nombre+' agregado al pedido',
        TipoMessage.success
      );
    });
  }
}