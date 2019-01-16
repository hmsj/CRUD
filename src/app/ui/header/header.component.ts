import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  title = 'Gymkhana';
  usuario: Usuario = new Usuario();
  currentUser: Usuario = new Usuario();
  message = '';
  messageType = '';
  showMessage = false;
  errorMsg: string;
  errorPassMsg: string;
  errorUsernameMsg: string;
  errorEmailMsg: string;
  repeatPass = '';


  constructor(
    private modalService: BsModalService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  isUserLogged(): boolean {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  isMessage(): boolean {
    this.message = localStorage.getItem('message');
    this.messageType = localStorage.getItem('messageType');
    if (this.message && this.message.length > 2) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }

    return this.showMessage;
  }

  closeAlert() {
    localStorage.removeItem('message');
    localStorage.removeItem('messageType');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  enableBtn(): boolean {
    if(this.usuario.username && this.usuario.username.trim() && this.usuario.pass) {
      return true;
    }
    return false;
  }

  onLogin() {
    this.userService.login(this.usuario).subscribe(data => {
      let user = JSON.stringify(data);
      sessionStorage.setItem('currentUser', user);
      this.modalRef.hide();
      this.vaciarCampos();
      localStorage.setItem('message', 'Ha iniciado sesión correctamente');
      localStorage.setItem('messageType', 'success');
    }, error => {
      this.errorMsg = 'Las credenciales no son correctas';
    })
  }

  onLogout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    localStorage.setItem('message', 'Ha cerrado la sesión');
    localStorage.setItem('messageType', 'danger');
  }


  onSignup() {
      this.usuario.nombre = this.usuario.nombre.trim();
      this.usuario.apellidos = this.usuario.apellidos.trim();
      this.usuario.email = this.usuario.email.trim();
      this.usuario.username = this.usuario.username.trim();
      this.usuario.roleId = 3;
      this.userService.signup(this.usuario).subscribe(data => {
        let user = JSON.stringify(data);
        sessionStorage.setItem('currentUser', user);
        this.modalRef.hide();
        this.vaciarCampos();
        localStorage.setItem('message', 'Usuario creado correctamente');
        localStorage.setItem('messageType', 'success');
      }, error => {
        this.errorMsg = 'Error al crear el usuario'
      })
        
  }

  enableBtnSignup() {
    if(!this.usuario.username || !this.usuario.username.trim()) {
      return false;
    }
    if(this.errorUsernameMsg !== ''){
      return false;
    }
    if(!this.usuario.nombre || !this.usuario.nombre.trim()) {
      return false;
    } 
    if(!this.usuario.apellidos || !this.usuario.apellidos.trim()) {
      return false;
    } 
    if(!this.usuario.email || !this.usuario.email.trim()) {
      return false;
    } 
    if(this.errorEmailMsg !== ''){
      return false;
    }
    if(!this.usuario.pass || !this.usuario.pass.trim()) {
      return false;
    } 
    if(!this.repeatPass || !this.repeatPass.trim()) {
      return false;
    } 
    if(this.errorPassMsg !== '') {
      return false;
    }
    this.errorUsernameMsg = '';
    this.errorPassMsg = '';
    this.errorEmailMsg = '';
    return true;
  
  }

  validPass() {
    if(this.repeatPass !== this.usuario.pass) {
      this.errorPassMsg = 'Las contraseñas deben coincidir';
    } else {
      this.errorPassMsg = '';
    }
  }

  validUsername() {
    if(this.usuario.username) {
      this.userService.getUserByUsername(this.usuario.username).subscribe(data => {
        if(data !== null) {
          this.errorUsernameMsg = 'El usuario ya existe';
        } else {
          this.errorUsernameMsg = '';
        }
      }, error => {
        this.errorUsernameMsg = '';
      })
    }
  }

  validEmail() {
    if(this.usuario.email) {
      this.userService.getUserByEmail(this.usuario.email).subscribe(data => {
        if(data !== null) {
          this.errorEmailMsg = 'El correo ya existe';
        } else {
          this.errorEmailMsg = '';
        }
      }, error => {
        this.errorEmailMsg = '';
      })
    }
  }

  private vaciarCampos() {
    this.usuario.username = '';
    this.usuario.nombre = '';
    this.usuario.apellidos = '';
    this.usuario.email = '';
    this.usuario.pass = '';
    this.repeatPass = '';
  }

}