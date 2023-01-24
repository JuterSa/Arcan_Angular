import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroTiempos, TotalHoras } from '../interfaces/Registro__Tiempos';

@Injectable({
  providedIn: 'root'
})
export class RegistroTiemposService {


  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getRecord(): Observable<any> {
    return this.servicio.get(`${this.servidor}/registro`);
  }

  getOneRecord(nmid: number) {
    return this.servicio.get<RegistroTiempos>(`${this.servidor}/registro/${nmid}`);
  }

  createRecord(registro: RegistroTiempos) {
    return this.servicio.post<RegistroTiempos>(`${this.servidor}/registro`, registro);
  }

  editar(registro: RegistroTiempos) {
    return this.servicio.put<RegistroTiempos>(`${this.servidor}/registro/`, registro.nmid);
  }

  updateRecord(registro: RegistroTiempos) {
    return this.servicio.put<RegistroTiempos>(this.servidor + "/registro", registro)
  }


  deleteRecord(nmid: number): Observable<any> {
    return this.servicio.delete(`${this.servidor}/registro/${nmid}`);
  }

  updateEstado(registro: RegistroTiempos) {
    return this.servicio.put<RegistroTiempos>(this.servidor + "/actualizarestado", registro)
  }

  getTotalHoras(fechaCon: Date) {
    return this.servicio.get<TotalHoras>(`${this.servidor}/totalhoras/${fechaCon}`)
  }

}
