import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion-service.service';
import { Router } from '@angular/router';
import { CartUsuarioService } from 'src/app/share/cart-usuario.service';

@Component({
  selector: 'app-pedidos-productos',
  templateUrl: './pedidos-productos.component.html',
  styleUrls: ['./pedidos-productos.component.css']
})
export class PedidosProductosComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gSevice: GenericService,
    private dialog:MatDialog,
    private router: Router,
    private cartService:CartUsuarioService,
    private notificacion:NotificacionService
  ) { 
    this.listaRestaurante();
  }

  listaRestaurante() {
    this.gSevice
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  crearComandaCliente(idResta: number) {
    this.cartService.idResta = idResta;
    this.cartService.refrescarCarrito();
    this.router.navigate(['pedidos/cliente',idResta]);
  }

}
