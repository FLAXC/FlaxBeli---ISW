import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesasIndexComponent } from './mesas-index/mesas-index.component';
import { MesaAllComponent } from './mesa-all/mesa-all.component';
import { MesaFormComponent } from './mesa-form/mesa-form.component';

const routes: Routes = [
  {path:'mesas-restaurante', component: MesasIndexComponent},
  {path:'mesas/all', component: MesaAllComponent},
  {path:'mesas/create',component: MesaFormComponent},
  {path:'mesas/update/:id',component: MesaFormComponent},
  {path:'mesas/porRestaurante/:id',component: MesasIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesasRestauranteRoutingModule { }
