import { Injectable } from '@angular/core';
import { Bitacoras } from '../interfaces/bitacoras';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pendientes } from '../interfaces/pendientes';

@Injectable({
  providedIn: 'root'
})
export class BitacorasService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getBitacora(): Observable<any> {
    return this.servicio.get(`${this.servidor}/bitacoras`);
  }

  createBitacora(bitacoras: Bitacoras) {
    return this.servicio.post<Bitacoras>(`${this.servidor}/bitacoras`, bitacoras);
  }
  createPendiente(pendientes: Pendientes){
    return this.servicio.post<Pendientes>(`${this.servidor}/pendientes`, pendientes);
  }

  edit(bitacoras: Bitacoras) {
    return this.servicio.put<Bitacoras>(`${this.servidor}/bitacoras/`, bitacoras.nmid_bitacora);
  }

  updateBitacora(bitacoras: Bitacoras) {
    return this.servicio.put<Bitacoras>(`${this.servidor}/bitacoras`, bitacoras);
  }

  getPendientesCount(): Observable<any> {
    return this.servicio.get(`${this.servidor}/pendientes-count`);
  }
}
