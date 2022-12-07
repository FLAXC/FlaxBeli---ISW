import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-pedidos-detail',
  templateUrl: './pedidos-detail.component.html',
  styleUrls: ['./pedidos-detail.component.css']
})
export class PedidosDetailComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<PedidosDetailComponent>,
    private gService: GenericService
  ) { 
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerPedido(this.datosDialog.id);
    }    
  }

  obtenerPedido(id: any) {
    this.gService
      .get('pedido', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  close() {
    //Dentro de close ()
    //this.form.value
    this.dialogRef.close();
  }

}
