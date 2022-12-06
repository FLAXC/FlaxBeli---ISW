import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { PedidosProductosComponent } from './pedidos-productos.component';

describe('PedidosProductosComponent', () => {
    let component: PedidosProductosComponent;
    let fixture: ComponentFixture<PedidosProductosComponent>;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PedidosProductosComponent],
        imports: [
          NoopAnimationsModule,
          LayoutModule,
          MatButtonModule,
          MatCardModule,
          MatGridListModule,
          MatIconModule,
          MatMenuModule,
        ]
      }).compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PedidosProductosComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should compile', () => {
      expect(component).toBeTruthy();
    });
  });