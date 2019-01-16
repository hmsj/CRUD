import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../app.component';

const baseUrl = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/getUsuarios');
  }

  login(data: Usuario) {
    return this.http.post(baseUrl + '/login', data);
  }

  signup(data: Usuario) {
    return this.http.post(baseUrl + '/signup', data);
  }

  getUserByUsername(username: string) {
    return this.http.get(baseUrl + '/getUserByUsername' + '/' + username);
  } 

  getUserByEmail(email: string) {
    return this.http.get(baseUrl + '/getUserByEmail' + '/' + email);
  }
}
