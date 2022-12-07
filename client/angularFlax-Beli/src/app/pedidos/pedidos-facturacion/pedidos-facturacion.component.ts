import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion-service.service';
import { PedidosDetailComponent } from '../pedidos-detail/pedidos-detail.component';

@Component({
  selector: 'app-pedidos-facturacion',
  templateUrl: './pedidos-facturacion.component.html',
  styleUrls: ['./pedidos-facturacion.component.css'],
})
export class PedidosFacturacionComponent implements OnInit {
  facturaForm: FormGroup;
  subtotal = 0;
  impuesto = 0;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  idMesa: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private dialog:MatDialog,
    private router: Router,
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.subtotal = this.cartService.getTotal();
    this.impuesto = this.cartService.getTotal() * 0.13;
    this.total = this.subtotal + this.impuesto;
    this.idMesa = this.cartService.idMesa;
  }

  formularioReactive() {
    this.facturaForm = this.fb.group({
      id: [null, null],
      tipoPago: [null, null],
      numeroTarjeta: [null, Validators.required],
      codigoTarjeta: [null, Validators.required],
      monto: [null, null],
      montoTarjeta: [null, null],
      montoTarjetaAmbas: [null, null],
      cambio: [null, null],
    });
  }
  registrarOrden() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if (this.cartService.getItems != null) {
      //Obtener todo lo necesario para crear la orden
      let itemsCarrito = this.cartService.getItems;
      let detalles = itemsCarrito.map((x) => ({
        ['productoId']: x.idItem,
        ['cantidad']: x.cantidad,
        ['notas']: x.notas,
      }));
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        productos: detalles,
        impuesto: (this.total = this.cartService.getTotal() * 0.13),
        subtotal: (this.total = this.cartService.getTotal()),
        total:
          (this.total = this.cartService.getTotal() * 0.13) +
          (this.total = this.cartService.getTotal()),
        mesaId: this.idMesa,
        usuarioId: this.currentUser.user.id,
        estado: 'Entregada',
      };
      this.gService.create('pedido', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje('Pedido', 'Pedido registrada', TipoMessage.success);
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        this.detallePedido(respuesta.id);
        this.router.navigate(['/mesas-restaurante']);
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Pedido',
        'Agregue productos a la orden',
        TipoMessage.warning
      );
    }
  }

  validacionesPedido() {
    if (this.facturaForm.invalid) {
      if (this.facturaForm.value.tipoPago == 'Efectivo') {
        if (this.facturaForm.value.monto >= this.total) {
          this.registrarOrden();
          return;
        } else {
          this.noti.mensaje('Pedido', 'El monto es menor', TipoMessage.warning);
          return;
        }
      }
      this.noti.mensaje(
        'Pedido',
        'La tarjeta o el código no cumplen los requisitos',
        TipoMessage.warning
      );
    } else {
      if (this.facturaForm.value.tipoPago == 'Tarjeta') {
        this.registrarOrden();
        this.noti.mensaje(
          'Pedido',
          'Cumple todos los requisitos',
          TipoMessage.success
        );
      }
      if (this.facturaForm.value.tipoPago == 'Ambas') {
        if (this.facturaForm.value.monto > 0) {
          this.registrarOrden();
        } else {
          this.noti.mensaje(
            'Pedido',
            'El monto debe ser mayor a cero',
            TipoMessage.warning
          );
          return;
        }
      }
    }
  }
  detallePedido(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(PedidosDetailComponent,dialogConfig);
  }
  
  calcularCambio() {
    let vuelto = this.facturaForm.value.monto - this.total;
    if (vuelto > 0) {
      return vuelto;
    } else {
      return 0;
    }
  }

  calcularPagoAmbas() {
    let montoTarjeta = this.total - this.facturaForm.value.monto;
    if (montoTarjeta > 0) {
      return montoTarjeta;
    } else {
      return 0;
    }
  }

  obtenerTotal() {
    let total = this.total;
    return total;
  }
}
