import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';

import { GruposRoutingModule } from './grupos-routing.module';
import { GrupoListComponent } from './grupo-list/grupo-list.component';

@NgModule({
  declarations: [GrupoListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule,
    GruposRoutingModule
  ]
})
export class GruposModule { }
