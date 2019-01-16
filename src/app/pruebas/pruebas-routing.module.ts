import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaListComponent } from './prueba-list/prueba-list.component';

const routes: Routes = [
  {path: '', component: PruebaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebasRoutingModule { }
