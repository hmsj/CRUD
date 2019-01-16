import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'pruebas', loadChildren: './pruebas/pruebas.module#PruebasModule'},
  {path: 'grupos', loadChildren: './grupos/grupos.module#GruposModule'},
  {path: 'usuarios', loadChildren: './users/users.module#UsersModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
