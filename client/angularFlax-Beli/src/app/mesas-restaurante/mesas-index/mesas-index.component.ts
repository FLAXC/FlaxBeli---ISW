import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/share/cart.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
@Component({
  selector: 'app-mesas-index',
  templateUrl: './mesas-index.component.html',
  styleUrls: ['./mesas-index.component.css']
})
export class MesasIndexComponent implements OnInit {
  datos: any;
  isAutenticated: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  qtyItems:Number = 0;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private gSevice: GenericService,
    private dialog:MatDialog,
    private cartService: CartService,
  ) { 
    this.listaMesas();
    }
  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor, this.currentUser)
    );
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
}
