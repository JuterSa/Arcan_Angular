import { DecimalPipe } from "@angular/common";

export interface RegistroTiempos {
    nmid: number;
    jornada: string;
    modulo: string;
    cdregistro: string;
    dsregistro: string;
    cdestado: string;
    fecha: Date;
    horasestimadas: number;
    horasreales: number;
    horastotales: number;


}

export interface TotalHoras {
    fechaCon: Date;
    totalHoras: number;
}
