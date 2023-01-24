import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opcion } from '../interfaces/Opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getOpcion(): Observable<any> {
    return this.servicio.get(`${this.servidor}/opcion`);
  }


  getOpcionPadre(cdusuario: String): Observable<any> {
    return this.servicio.get<Opcion>(`${this.servidor}/opcionPadre/${cdusuario}`);
  }

  createOpcion(opcion: Opcion) {
    return this.servicio.post<Opcion>(`${this.servidor}/opcion`, opcion);
  }

  editar(opcion: Opcion) {
    return this.servicio.put<Opcion>(`${this.servidor}/opcion/`, opcion.nmid);
  }

  updateOpcion(opcion: Opcion) {
    return this.servicio.put<Opcion>(this.servidor + "/opcion", opcion)
  }

  getOpcionidpadre(cdusuario: String, nmid_padre: number): Observable<any> {
    return this.servicio.get<Opcion>(`${this.servidor}/opcionhijo/${cdusuario}/${nmid_padre}`);

  }
}
