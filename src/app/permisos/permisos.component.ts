import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Permisos } from '../interfaces/Permisos'
import { PermisosService } from '../services/permisos.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})

export class PermisosComponent implements OnInit {
  data: any;
  datosPermisos: Array<Permisos> = [];
  myForm! : FormGroup;
  today = new Date().toISOString().split('T')[0];
  dtOptions: DataTables.Settings = {};

  constructor(private fb:FormBuilder, private router:Router, private http:HttpClient, private config:NgbModalConfig, private modalService: NgbModal, private servicioPermiso: PermisosService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.formulario();
    this.refresh();
  }

  guardar(form:FormGroup){
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        this.formulario();
        return;
      }
      this.servicioPermiso.createPermisos(form.value)
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
    this.servicioPermiso.updatePermisos(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
      });
  }

  formulario(){
    this.myForm = this.fb.group({
      nmid:[''],
      cdidentificacion:['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      dsnombrecompleto:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      dscargo:['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dscorreo:['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      nmtelefono:['',[Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      dspermiso:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      fesolicitud:[this.today],
      fedesde:[''],
      fehasta:[''],
      dsreponer_tiempo:['',[Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      dsforma_reponer_tiempo:['',[Validators.minLength(5), Validators.maxLength(50)]],
      dsmotivos:['',[Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      dssituaciones:['',[Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      dsobservaciones:['',[Validators.maxLength(250)]],
      dsrecursos_humanos:['',[Validators.maxLength(250)]],
      dsobservaciones_jefe:['',[Validators.maxLength(250)]],
      cdestado:['Por aprobar']
    })
  }

  editar(datos: { nmid: any; cdidentificacion: any; dsnombrecompleto: any;  dscargo:any; dscorreo:any;
    nmtelefono: any; dspermiso: any; fesolicitud: any; fedesde: any; fehasta: any; dsreponer_tiempo: any;
    dsforma_reponer_tiempo: any; dsmotivos: any; dssituaciones: any; dsobservaciones: any; dsrecursos_humanos: any;
    dsobservaciones_jefe:any; cdestado:any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdidentificacion: datos.cdidentificacion,
      dsnombrecompleto: datos.dsnombrecompleto,
      dscargo: datos.dscargo,
      dscorreo: datos.dscorreo,
      nmtelefono: datos.nmtelefono,
      dspermiso: datos.dspermiso,
      fesolicitud: datos.fesolicitud,
      fedesde: datos.fedesde,
      fehasta: datos.fehasta,
      dsreponer_tiempo: datos.dsreponer_tiempo,
      dsforma_reponer_tiempo: datos.dsforma_reponer_tiempo,
      dsmotivos: datos.dsmotivos,
      dssituaciones: datos.dssituaciones,
      dsobservaciones: datos.dsobservaciones,
      dsrecursos_humanos: datos.dsrecursos_humanos,
      dsobservaciones_jefe: datos.dsobservaciones_jefe,
      cdestado: datos.cdestado
    })
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  refresh() {
    let arrayPermisos: Array<Permisos> = [];
    this.servicioPermiso.getPermisos().subscribe(datos => {
      this.datosPermisos = datos.data;
    });
  }
}

