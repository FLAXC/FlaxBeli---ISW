import { AfterViewInit, Component} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MesaDetailComponent } from '../mesa-detail/mesa-detail.component';

@Component({
  selector: 'app-mesa-all',
  templateUrl: './mesa-all.component.html',
  styleUrls: ['./mesa-all.component.css']
})
export class MesaAllComponent implements AfterViewInit{
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','codigoMesa',"estadoMesa","acciones","acciones2"];
  constructor( private router: Router,
    private route: ActivatedRoute,
    private gService:GenericService,
    private dialog:MatDialog
    ) { 
  }
  ngAfterViewInit(): void {
    this.listaMesas();
  }
  listaMesas() {
    this.gService
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((datas: any) => {
        console.log(datas);
        this.datos = datas;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  
  detalleMesa(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(MesaDetailComponent,dialogConfig);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
 
  crearMesa() {
    this.router.navigate(['/mesas/create'], {
      relativeTo: this.route,
    });
  }

  actualizarMesa(id: number) {
    this.router.navigate(['/mesas/update', id], {
      relativeTo: this.route,
    });
  }
}
