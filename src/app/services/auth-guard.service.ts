import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Usuario } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  currentUser: Usuario = new Usuario();
  
  constructor(
    //public auth: AuthGuardService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if(!this.isUserLogged() || this.currentUser.roleId!==1){
      return false;
    } 
    return true;
  }

  private isUserLogged(): boolean {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
