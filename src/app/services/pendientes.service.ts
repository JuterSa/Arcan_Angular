import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pendientes } from '../interfaces/pendientes';

@Injectable({
  providedIn: 'root'
})
export class PendientesService {
 
  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getPendientes(): Observable<any> {
    return this.servicio.get(`${this.servidor}/pendientes`);
  }

  createPendientes(pendientes: Pendientes) {
    return this.servicio.post<Pendientes>(`${this.servidor}/pendientes`, pendientes);
  }

  edit(pendientes: Pendientes) {
    return this.servicio.put<Pendientes>(`${this.servidor}/pendientes/`, pendientes.nmid_pendiente);
  }

  updatePendientes(pendientes: Pendientes) {
    return this.servicio.put<Pendientes>(`${this.servidor}/pendientes`, pendientes);
  }
 // getPendientesByBitacora(): Observable<any>{
   // return this.servicio.get(`${this.servidor}/pendientes`)
  //}
  
  getPendientesByBitacora(nmid_bitacora: number): Observable<any>{
    return this.servicio.get<Pendientes>(`${this.servidor}/pendientes-bitacora/${nmid_bitacora}`);
}
 
}
