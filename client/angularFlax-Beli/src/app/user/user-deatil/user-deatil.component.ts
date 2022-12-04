import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductosDetailComponent } from 'src/app/productos/productos-detail/productos-detail.component';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-deatil',
  templateUrl: './user-deatil.component.html',
  styleUrls: ['./user-deatil.component.css']
})
export class UserDeatilComponent implements OnInit {

  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ProductosDetailComponent>,
    private gService: GenericService
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerUsuario(this.datosDialog.id);
    }   
  }

  obtenerUsuario(id: any) {
    this.gService
      .get('usuario', id)
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
