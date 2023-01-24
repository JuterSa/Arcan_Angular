import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permisos } from '../interfaces/Permisos'

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  servidor = 'http://localhost:8080/api';

  constructor(private servicio: HttpClient) { }

  createPermisos(permisos: Permisos) {
    return this.servicio.post<Permisos>(`${this.servidor}/permisos`, permisos);
  }

  getPermisos(): Observable<any> {
    return this.servicio.get(`${this.servidor}/permisos`);
  }

  updatePermisos(permisos: Permisos) {
    return this.servicio.put<Permisos>(`${this.servidor}/permisos`, permisos);
  }
}
