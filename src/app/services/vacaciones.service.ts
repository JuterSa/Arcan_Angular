import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacaciones } from '../interfaces/Vacaciones';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) {}

  getVacaciones(): Observable<any> {
    return this.servicio.get(`${this.servidor}/vacaciones`);
  }

  createVacaciones(vacaciones: Vacaciones) {
    return this.servicio.post<Vacaciones>(`${this.servidor}/vacaciones`, vacaciones);
  }

  edit(vacaciones: Vacaciones){
    return this.servicio.put<Vacaciones>(`${this.servidor}/vacaciones`, vacaciones.nmid);
  }

  updateVacaciones(vacaciones: Vacaciones){
    return this.servicio.put<Vacaciones>(`${this.servidor}/vacaciones`, vacaciones);
  }
}
