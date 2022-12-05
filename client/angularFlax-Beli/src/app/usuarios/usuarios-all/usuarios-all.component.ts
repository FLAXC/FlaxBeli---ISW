import { AfterViewInit, Component} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsuariosDetailComponent } from '../usuarios-detail/usuarios-detail.component';

@Component({
  selector: 'app-usuarios-all',
  templateUrl: './usuarios-all.component.html',
  styleUrls: ['./usuarios-all.component.css']
})
export class UsuariosAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','email','nombre',"role","acciones","acciones2"];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog
  ) { }
  ngAfterViewInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datas: any) => {
        console.log(datas);
        this.datos = datas;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleUsuario(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(UsuariosDetailComponent,dialogConfig);
  }

  crearUsuario() {
    this.router.navigate(['/usuarios/create'], {
      relativeTo: this.route,
    });
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['/usuarios/update', id], {
      relativeTo: this.route,
    });
  }

}
