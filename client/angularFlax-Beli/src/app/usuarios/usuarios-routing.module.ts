import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosAllComponent } from './usuarios-all/usuarios-all.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

const routes: Routes = [
  {path:'usuarios/all', component: UsuariosAllComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
  {path:'usuarios/create', component: UsuariosFormComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
  {path:'usuarios/update/:id', component: UsuariosFormComponent,  canActivate:[AuthGuard], data:{
    roles:['Administrador']
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
