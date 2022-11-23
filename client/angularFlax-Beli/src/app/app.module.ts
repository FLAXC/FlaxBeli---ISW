import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { MesasRestauranteModule } from './mesas-restaurante/mesas-restaurante.module';
import { ShareModule } from './share/share.module';
import { ProdutosModule } from './productos/produtos.module';
import { PedidosAllComponent } from './pedidos/pedidos-all/pedidos-all.component';
import { PedidosModule } from './pedidos/pedidos.module';

import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserIndexComponent } from './user/user-index/user-index.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserIndexComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule, 
    ShareModule,
    HomeModule, 
    UserModule,
    MesasRestauranteModule, 
    AppRoutingModule, ProdutosModule, PedidosModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptorService, multi: true }, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
