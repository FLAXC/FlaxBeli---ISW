import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.css']
})
export class UsuariosDetailComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<UsuariosDetailComponent>,
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
    this.dialogRef.close();
  }

}
