import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../app.component';

const baseUrl = 'http://localhost:3000/api/grupos';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/getGrupos');
  }

  post(data: Grupo) {
    return this.http.post(baseUrl + '/addGrupo', data);
  }

  
  update(data: Grupo) {
    return this.http.post(baseUrl + '/updateGrupo', data);
  }

  delete(id) {
    return this.http.post(baseUrl + '/deleteGrupo', id);
  }

  getGrupo(numero) {
    return this.http.get(baseUrl + '/getGrupo' + '/' + numero);
  } 
}
