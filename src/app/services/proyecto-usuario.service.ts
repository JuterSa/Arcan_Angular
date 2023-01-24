import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaboradores } from '../interfaces/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ProyectoUsuarioService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getColaborador(): Observable<any> {
    return this.servicio.get(`${this.servidor}/colaborador`);
  }

  getProyectoUsuarioId(nmproyectoid: number): Observable<any> {
    return this.servicio.get<Colaboradores>(`${this.servidor}/colaborador_proyecto/{nmproyectoid}?nmproyectoid=${nmproyectoid}`);
  }

  createProyecto_Usuario(colaborador: Colaboradores) {
    return this.servicio.post<Colaboradores>(`${this.servidor}/colaborador`, colaborador);
  }

  editar(colaborador: Colaboradores) {
    return this.servicio.put<Colaboradores>(`${this.servidor}/colaborador/`, colaborador.nmid);
  }

  updateColaborador(colaborador: Colaboradores) {
    return this.servicio.put<Colaboradores>(this.servidor + "/colaborador", colaborador)
  }
}
