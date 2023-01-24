import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DesArtefacto } from '../interfaces/Proceso';
import { ProcesoService } from '../services/proceso.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-administrador-procesos',
  templateUrl: './administrador-procesos.component.html',
  styleUrls: ['./administrador-procesos.component.scss']
})

export class AdministradorProcesosComponent implements OnInit {

  myForm!: FormGroup;
  filterPost = '';
  datosProceso: Array<DesArtefacto> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;
  [x: string]: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private ProcesoS: ProcesoService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      nmsecuencia: [''],
      dsproceso: [''],
      cdproceso: [''],
      cdrol: [''],
      cdestado: [''],
      cdtipo: [''],
    });

    let arrayProceso: Array<DesArtefacto> = [];
    this.ProcesoS.getall().subscribe(datos => {
      this.datosProceso = datos.data;
    });

  }
  editar(datos: { nmid: any; nmsecuencia: any; dsproceso: any; cdproceso: any; cdrol: any; cdestado: any; cdtipo: any }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      nmsecuencia: datos.nmsecuencia,
      dsproceso: datos.dsproceso,
      cdproceso: datos.cdproceso,
      cdrol: datos.cdrol,
      cdtipo: datos.cdtipo,
      cdestado: datos.cdestado,
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }

  open2(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }
  open3(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        return;
      }
      this.ProcesoS.create(form.value)
        .subscribe(data => {
          alert("Se guardó el cliente con éxito!");
          this.myForm.reset();
          this.refresh();
        }
        )
    }
    else {
      alert('formualario inválido')
    }
  }

  refresh() {
    let arrayProceso: Array<DesArtefacto> = [];
    this.ProcesoS.getall().subscribe(datos => {
      this.datosProceso = datos.data;
    });
  }
  actualizar(form: FormGroup) {
    this.ProcesoS.update(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
}


