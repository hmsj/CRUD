import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoListComponent } from './grupo-list/grupo-list.component';

const routes: Routes = [
  {path: '', component: GrupoListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
