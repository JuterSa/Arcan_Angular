import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesArtefacto } from '../interfaces/Proceso'

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getall(): Observable<any> {
    return this.servicio.get(`${this.servidor}/proceso`);
  }
  create(desArtefacto: DesArtefacto) {
    return this.servicio.post<DesArtefacto>(`${this.servidor}/proceso`, desArtefacto);
  }

  editar(desArtefacto: DesArtefacto) {
    return this.servicio.put<DesArtefacto>(`${this.servidor}/proceso/`, desArtefacto.nmid);
  }

  update(desArtefacto: DesArtefacto) {
    return this.servicio.put<DesArtefacto>(this.servidor + "/proceso", desArtefacto)
  }

  Buscar(dsproceso: String): Observable<any> {
    return this.servicio.get<DesArtefacto>(`${this.servidor}/procesoB/${dsproceso}`);
  }

}
