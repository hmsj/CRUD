import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gymkhanaCRUD';

  ngOnInit() {
    localStorage.removeItem('message');
    localStorage.removeItem('messageType');
    sessionStorage.removeItem('currentUser');
  }
}

export class Prueba {
  numero: number;
  nombre: string;
  descripcion: string;
  zona: string;
}

export class Grupo {
  numero: number;
  nombre: string;
  puntuacionTotal: number;
}

export class Usuario {
  username: string;
  nombre: string;
  apellidos: string;
  email: string;
  pass: string;
  roleId: number;
}
