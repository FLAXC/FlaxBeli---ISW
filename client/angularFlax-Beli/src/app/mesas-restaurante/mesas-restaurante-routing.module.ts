import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesasIndexComponent } from './mesas-index/mesas-index.component';
import { MesaAllComponent } from './mesa-all/mesa-all.component';
import { MesaFormComponent } from './mesa-form/mesa-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'mesas-restaurante', component: MesasIndexComponent, canActivate:[AuthGuard], data:{
    roles:['Administrador','Empleado']
  }},
  {path:'mesas/all', component: MesaAllComponent, canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
  {path:'mesas/create',component: MesaFormComponent, canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
  {path:'mesas/update/:id',component: MesaFormComponent, canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
  {path:'mesas/porRestaurante/:id',component: MesasIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRestauranteRoutingModule { }
