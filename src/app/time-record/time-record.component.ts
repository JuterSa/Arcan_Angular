import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroTiempos } from '../interfaces/Registro__Tiempos';
import { RegistroTiemposService } from '../services/registro-tiempos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-time-record',
  templateUrl: './time-record.component.html',
  styleUrls: ['./time-record.component.scss']
})
export class TimeRecordComponent implements OnInit {
  timeForm!: FormGroup;
  dateForm!: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  progreso: RegistroTiempos[] = [];
  tarea: RegistroTiempos[] = [];
  hecho: RegistroTiempos[] = [];
  pausada: RegistroTiempos[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  arrayRegistro = new Array<RegistroTiempos>();
  menuVisible: number = 0;
  nmid: number = 0;
  datosRegistros: RegistroTiempos = {
    nmid: 0,
    jornada: '',
    modulo: '',
    cdregistro: '',
    dsregistro: '',
    cdestado: '',
    fecha: new Date(Date.now()),
    horasestimadas: 0.0,
    horasreales: 0.0,
    horastotales: 0.0
  };
  horas: number = 0.0;
  fecha2 = new Date("yyyy-MM-dd");

  constructor(private fb: FormBuilder, private registroService: RegistroTiemposService,
    private router: Router, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      //item: [''],
      nmid: [''],
      jornada: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      modulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      cdregistro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      dsregistro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      cdestado: ['A'],
      fecha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      horasestimadas: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      horasreales: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      horastotales: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    })

    this.dateForm = this.fb.group({
      fechaCon: ['', new Date("yyyy-MM-dd")]
    })

    this.registroService.getRecord().subscribe(datos => {
      for (var i = 0; i < datos.data.length; i++) {
        switch (datos.data[i].cdestado) {
          case 'A':
            this.tarea.push(datos.data[i]);
            break;
          case 'P':
            this.progreso.push(datos.data[i]);
            break;
          case 'R':
            this.hecho.push(datos.data[i]);
            break;
          case 'I':
            this.pausada.push(datos.data[i]);
            break;
        }
      }
    });

  }

  editar(i: number, datos: {
    nmid: any; jornada: any; modulo: any; cdregistro: any; dsregistro: any; cdestado: any; fecha: any;
    horasestimadas: any; horasreales: any; horastotales: any
  }) {
    this.timeForm.setValue({
      nmid: datos.nmid,
      jornada: datos.jornada,
      modulo: datos.modulo,
      cdregistro: datos.cdregistro,
      dsregistro: datos.dsregistro,
      cdestado: datos.cdestado,
      fecha: datos.fecha,
      horasestimadas: datos.horasestimadas,
      horasreales: datos.horasreales,
      horastotales: datos.horastotales
    })
    this.timeForm.controls['item'].setValue(datos.nmid);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  Actualizar(form: FormGroup) {
    this.registroService.updateRecord(form.value)
      .subscribe(data => {
        this.refresh();
      });

  }

  guardarTareas(form: FormGroup,) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.Actualizar(form);
      this.refresh();
      this.timeForm.reset();
      return;
    }

    this.registroService.createRecord(form.value).subscribe(
      data => {
        this.timeForm.reset();
      }
    )
  }

  drop(event: CdkDragDrop<RegistroTiempos[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if (event.container.id === 'cdk-drop-list-0') {
        const old = event.container.data.find(x => x.cdestado !== 'A');
        old!.cdestado = "A";
        console.log({ id: old });
        this.registroService.updateRecord(old!).subscribe(console.log);
        this.refresh()
      }
      if (event.container.id === 'cdk-drop-list-1') {
        const old = event.container.data.find(x => x.cdestado !== 'P');
        old!.cdestado = "P";
        this.registroService.updateRecord(old!).subscribe(console.log);
        this.refresh()
      }
      if (event.container.id === 'cdk-drop-list-2') {
        const old = event.container.data.find(x => x.cdestado !== 'R');
        old!.cdestado = "R";
        console.log({ id: old });
        this.registroService.updateRecord(old!).subscribe(console.log);
        this.refresh()
      }
      if (event.container.id === 'cdk-drop-list-3') {
        const old = event.container.data.find(x => x.cdestado !== 'I');
        old!.cdestado = "I";
        console.log({ id: old });
        this.registroService.updateRecord(old!).subscribe(console.log);
        this.refresh()
      }
    }
  }

  refresh() {
    this.registroService.getRecord().subscribe(datos => {
      console.log(datos);
    });
  }

  eliminarRecord(nmid: number) {
    this.registroService.deleteRecord(nmid)
      .subscribe(datos => {
        this.tarea = datos.data;
        this.progreso = datos.data;
        this.refresh();
      })
  }

  open(content: any) {
    this.modalService.open(content);
    this.timeForm.reset();
  }

  openView(content2: any, nmid: number) {
    this.registroService.getOneRecord(nmid)
      .subscribe((response: any) => {
        console.log(response)
        this.datosRegistros = response.data
      });
    this.modalService.open(content2, { size: 'lg' });
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  openTimeRecord(content3: any) {
    this.modalService.open(content3);
    this.timeForm.reset();
  }

  horasPorFecha(form: FormGroup) {
    this.registroService.getTotalHoras(form.value.fechaCon)
      .subscribe((response: any) => {
        console.log(response.totalHoras)
        this.horas = response.totalHoras
      });
  }

}
