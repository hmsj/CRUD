import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prueba } from '../app.component';

const baseUrl = 'http://localhost:3000/api/pruebas';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl + '/getPruebas');
  }

  post(data: Prueba) {
    return this.http.post(baseUrl + '/addPrueba', data);
  }

  update(data: Prueba) {
    return this.http.post(baseUrl + '/updatePrueba', data);
  }

  delete(id) {
    return this.http.post(baseUrl + '/deletePrueba', id);
  }

  getPrueba(numero) {
    return this.http.get(baseUrl + '/getPrueba' + '/' + numero);
  } 
}
