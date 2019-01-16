import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UiRoutingModule } from './ui-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [FooterComponent, HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    UiRoutingModule
  ], 
  exports: [LayoutComponent]
})
export class UiModule { }
