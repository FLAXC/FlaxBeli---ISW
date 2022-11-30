import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/share/cart.service';
@Component({
  selector: 'app-mesas-index',
  templateUrl: './mesas-index.component.html',
  styleUrls: ['./mesas-index.component.css']
})
export class MesasIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gSevice: GenericService,
    private dialog:MatDialog,
    private cartService: CartService,
  ) { 
    this.listaMesas();
    }
    listaMesas() {
      this.gSevice
        .list('mesa/')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datos = data;
        });
    }

    crearComanda(idMesa: number) {
      this.cartService.idMesa = idMesa;
      this.cartService.refrescarCarrito();
      this.router.navigate(['pedidos/orden']);
    }
    
    productos(idResta:number){
      this.router.navigate(['pedidos/orden',idResta]);
    }

    // comprar(id:number){
    //   this.gSevice
    //   .get('producto',id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data:any)=>{
    //     //Agregar producto obtenido del API al carrito
    //     this.cartService.addToCart(data);
    //     //Notificar al usuario
    //     this.notificacion.mensaje(
    //       'Orden',
    //       'Producto: '+data.nombre+' agregado a la orden',
    //       TipoMessage.success
    //     );
    //   });
    // }
}
