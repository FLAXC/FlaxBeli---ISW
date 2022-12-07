import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService, ItemCart  } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';
import { ProductosDetailComponent } from 'src/app/productos/productos-detail/productos-detail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService } from 'src/app/share/authentication.service';
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
  displayedColumns: string[] = ['producto', 'precio', 'cantidad','notas', 'subtotal','acciones'];
  displayedColumnsProducts: string[] = ['nombre', 'descripcion','categoria','precio',"accionesCompra",'acciones'];
  dataSource = new MatTableDataSource<any>();
  dataSourceProducts = new MatTableDataSource<any>();
  datosDialog: any;
  idResta:any;
  currentUser: any;
  idMesa:any;
  constructor(
    private authService: AuthenticationService,
    private cartService: CartService,
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
    this.cartService.currentDataCart$.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartService.getTotal();
    this.listaProductos(this.idResta); 
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.idMesa=this.cartService.idMesa;
  }

  obtenerNotas(item: any) {
    this.cartService.addToCart(item);
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

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filtro.trim().toLowerCase();
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
    this.router.navigate(['/pedidos/facturacion']);
    // this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    // if(this.cartService.getItems!=null){
    //  //Obtener todo lo necesario para crear la orden
    //  let itemsCarrito=this.cartService.getItems;
    //  let detalles=itemsCarrito.map(
    //    x=>({
    //      ['productoId']: x.idItem,
    //      ['cantidad']: x.cantidad,
    //      ['notas']: x.notas
    //    })
    //  );
    //  //Datos para el API
    //  let infoOrden={
    //    'fechaOrden':new Date(this.fecha),
    //    'productos':detalles,
    //    'impuesto' : (this.total = this.cartService.getTotal() * 0.13),
    //    'subtotal' : (this.total = this.cartService.getTotal()),
    //    'total' : (this.total = this.cartService.getTotal() * 0.13) + (this.total = this.cartService.getTotal()),
    //    'mesaId' : this.cartService.idMesa,
    //    'usuarioId' : this.currentUser.user.id,
    //    'estado' : 'Entregada'
    //  }
    //  this.gService
    //  .create('pedido',infoOrden)
    //  .subscribe((respuesta:any)=>{
    //      this.noti.mensaje('Orden',
    //      'Orden registrada',
    //      TipoMessage.success);
    //      this.cartService.deleteCart();
    //      this.total=this.cartService.getTotal();
    //      console.log(respuesta);
    //    });
     
 
    // }else{
    //  this.noti.mensaje('Orden',
    //  'Agregue productos a la orden',
    //  TipoMessage.warning);
    // }
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
