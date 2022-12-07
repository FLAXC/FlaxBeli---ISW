import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { D } from 'chart.js/dist/chunks/helpers.core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartUsuarioService } from 'src/app/share/cart-usuario.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion-service.service';
import { PedidosDetailComponent } from '../pedidos-detail/pedidos-detail.component';

@Component({
  selector: 'app-pedidos-factura-cliente',
  templateUrl: './pedidos-factura-cliente.component.html',
  styleUrls: ['./pedidos-factura-cliente.component.css'],
})
export class PedidosFacturaClienteComponent implements OnInit {
  facturaForm: FormGroup;
  subtotal = 0;
  impuesto = 0;
  totalfactura = 0;
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cartUsuarioService: CartUsuarioService,
    private noti: NotificacionService,
    private gService: GenericService,
    private dialog:MatDialog,
    private router: Router,
  ) {this.formularioReactive();}

  ngOnInit(): void {
    this.subtotal = this.cartUsuarioService.getTotal();
    this.impuesto = this.cartUsuarioService.getTotal() * 0.13;
    this.totalfactura =
      (this.total = this.cartUsuarioService.getTotal() * 0.13) +
      (this.total = this.cartUsuarioService.getTotal());
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

  registrarPedido() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if (this.cartUsuarioService.getItems != null) {
      //Obtener todo lo necesario para crear la orden
      let itemsCarrito = this.cartUsuarioService.getItems;
      let detalles = itemsCarrito.map((x) => ({
        ['productoId']: x.idItem,
        ['cantidad']: x.cantidad,
        ['notas']: x.notas,
      }));
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        productos: detalles,
        impuesto: (this.total = this.cartUsuarioService.getTotal() * 0.13),
        subtotal: (this.total = this.cartUsuarioService.getTotal()),
        total:
          (this.total = this.cartUsuarioService.getTotal() * 0.13) +
          (this.total = this.cartUsuarioService.getTotal()),
        mesaId: null,
        usuarioId: this.currentUser.user.id,
        estado: 'Entregada',
      };
      this.gService
        .create('pedido/pedidoCliente', infoOrden)
        .subscribe((respuesta: any) => {
          this.noti.mensaje('Pedido', 'Pedido registrada', TipoMessage.success);
          this.cartUsuarioService.deleteCart();
          this.total = this.cartUsuarioService.getTotal();
          this.detallePedido(respuesta.id);
          this.router.navigate(['/pedidos/productos']);
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
  openPDF() {
    let DATA: any = "fdsf";
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }
  
  validacionesPedido() {
    if (this.facturaForm.invalid) {
      if (this.facturaForm.value.tipoPago == 'Efectivo') {
        if (this.facturaForm.value.monto >= this.total) {
          this.registrarPedido();
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
        this.registrarPedido();
        this.noti.mensaje(
          'Pedido',
          'Cumple todos los requisitos',
          TipoMessage.success
        );
      }
      if (this.facturaForm.value.tipoPago == 'Ambas') {
        if (this.facturaForm.value.monto > 0) {
          this.registrarPedido();
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
