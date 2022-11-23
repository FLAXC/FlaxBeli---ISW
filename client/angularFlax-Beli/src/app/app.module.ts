import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { MesasRestauranteModule } from './mesas-restaurante/mesas-restaurante.module';
import { ShareModule } from './share/share.module';
import { ProdutosModule } from './productos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';

import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule, 
    ShareModule,
    HomeModule, 
    MesasRestauranteModule, 
    ProdutosModule,
    PedidosModule,

    //Siempre de ultimo
    AppRoutingModule, 
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptorService, multi: true }, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
