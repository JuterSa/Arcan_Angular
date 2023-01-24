import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Vacaciones } from '../interfaces/Vacaciones';
import { VacacionesService } from '../services/vacaciones.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuarios } from '../interfaces/Usuarios';


declare var $: any;
@Component({
  selector: 'app-solicitud-vacaciones',
  templateUrl: './solicitud-vacaciones.component.html',
  styleUrls: ['./solicitud-vacaciones.component.scss']
})

export class SolicitudVacacionesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  myForm!: FormGroup;
  dtTrigger = new Subject<any>();
  datosVacaciones: Array<Vacaciones> = [];
  datosUsuarios: Array<Usuarios> = [];
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder,private userService:UsuariosService, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioVacaciones: VacacionesService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.formulario();
    this.refresh();
  }


  enviar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        this.formulario();
        return;
      }
      this.servicioVacaciones.createVacaciones(form.value)
        .subscribe(data => {
          alert("Se envió con exito la solicitud de vacaciones");
          this.formulario();
        }
        )
    } else {
      alert('formualario inválido')
    }
  }

  actualizar(form: FormGroup) {
    this.servicioVacaciones.updateVacaciones(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
      });
  }

  refresh() {
    let arrayVacaciones: Array<Vacaciones> = [];
    this.servicioVacaciones.getVacaciones().subscribe(datos => {
      this.datosVacaciones = datos.data;
    });
  }



  formulario() {
    this.myForm = this.fb.group({
      nmid: [''],
      dscorreo: [''],
      fesolicitud: [this.today],
      dssolicitada: ['', [Validators.required]],
      fedesde: ['', [Validators.required,]],
      fehasta: ['', [Validators.required,]],
      fereintegro: ['', [Validators.required,]],
      dspago: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      feinicioentregas: ['', [Validators.required,]],
      fefinentregas: ['', [Validators.required,]],
      dspersonarecibe: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      dsactividad: ['', [Validators.maxLength(50)]],
      dstarea: ['', [Validators.maxLength(100)]],
      dsempleadorecibe: ['', [Validators.maxLength(50)]],
      dsobservaciones: ['', [Validators.maxLength(250)]],
      cdestado: ['Por aprobar'],
      dsobserva_ghumana: ['', [Validators.maxLength(250)]],
      dsobserva_jefe: ['', [Validators.maxLength(250)]]
    });
  }

  editar(datos: {
    nmid: any; dscorreo: any; fesolicitud: any; dssolicitada: any; fedesde: any; fehasta: any; fereintegro: any; dspago: any; feinicioentregas: any;
    fefinentregas: any; dspersonarecibe: any; dsactividad: any; dstarea: any; dsempleadorecibe: any; dsobservaciones: any; cdestado: any; dsobserva_ghumana: any; dsobserva_jefe: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dscorreo: datos.dscorreo,
      fesolicitud: datos.fesolicitud,
      dssolicitada: datos.dssolicitada,
      fedesde: datos.fedesde,
      fehasta: datos.fehasta,
      fereintegro: datos.fereintegro,
      dspago: datos.dspago,
      feinicioentregas: datos.feinicioentregas,
      fefinentregas: datos.fefinentregas,
      dspersonarecibe: datos.dspersonarecibe,
      dsactividad: datos.dsactividad,
      dstarea: datos.dstarea,
      dsempleadorecibe: datos.dsempleadorecibe,
      dsobservaciones: datos.dsobservaciones,
      cdestado: datos.cdestado,
      dsobserva_ghumana: datos.dsobserva_ghumana,
      dsobserva_jefe: datos.dsobserva_jefe
    })
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }
}

