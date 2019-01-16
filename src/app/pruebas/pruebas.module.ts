import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebaListComponent } from './prueba-list/prueba-list.component';

@NgModule({
  declarations: [PruebaListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule,
    PruebasRoutingModule    
  ]
})
export class PruebasModule { }
