import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';
import { ProductosDetailComponent } from 'src/app/productos/productos-detail/productos-detail.component';

@Component({
  selector: 'app-pedidos-productos',
  templateUrl: './pedidos-productos.component.html',
  styleUrls: ['./pedidos-productos.component.css']
})
export class PedidosProductosComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gSevice: GenericService,
    private dialog:MatDialog,
    private cartService:CartService,
    private notificacion:NotificacionService
  ) { 
    this.listaProductos();
  }

  listaProductos() {
    this.gSevice
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
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


  comprar(id:number){
    this.gSevice
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


  ngOnInit(): void {
  }

}
