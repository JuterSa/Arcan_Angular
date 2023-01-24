import { Component, Input, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../interfaces/proyecto';
import { Clientes } from '../interfaces/Clientes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { Auth } from 'aws-amplify';

declare var $: any;
@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.scss']
})

export class MisProyectosComponent implements OnInit, OnDestroy {

  [x: string]: any;
  datosClientes: Array<Clientes> = [];
  datosProyecto: Array<Proyecto> = [];
  myForm!: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  filterPost = '';

  @Input()
  currentProyecto?: Proyecto;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioProyecto: ProyectoService, private servicioCliente: ClientesService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      dsproyecto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      nmclienteid_proy: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });

    let arrayProyecto: Array<Proyecto> = [];

    Auth.currentUserInfo().then(info => {
      this.usuario = info.username;

      this.servicioProyecto.getProyectosUsuario(this.usuario).subscribe(datosProyecto => {
        this.datosProyecto = datosProyecto.data;
      })
    })



    let arrayClientes: Array<Clientes> = [];
    this.servicioCliente.getClientes().subscribe(datos => {
      this.datosClientes = datos.data;
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  onEdit() {
    this.router.navigate(['/asignacion-de-colaboradores']);
  }

  guardar(form: FormGroup) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.actualizar(form);
      return;
    }
    this.servicioProyecto.createProyectos(form.value)
      .subscribe(data => {
        alert("Se guardó el proyecto con éxito!");
        this.myForm.reset();
        this.refresh();
      }
      )
  }

  editar(datos: { nmid: any; dsproyecto: any; nmclienteid_proy: any; cdestado: any; }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dsproyecto: datos.dsproyecto,
      nmclienteid_proy: datos.nmclienteid_proy,
      cdestado: datos.cdestado
    })
  }
  mostrar(datos: { nmid: any; dsproyecto: any; dscliente: any; nmclienteid_proy: any }) {
    this.router.navigate(["administrador-de-sprints"], { queryParams: { nmid: datos.nmid, dsproyecto: datos.dsproyecto, dscliente: datos.dscliente, nmclienteid_proy: datos.nmclienteid_proy } });
  }

  mostrar2(datos: { nmid: any; dsproyecto: any; dscliente: any }) {
    this.router.navigate(["registro-de-tiempos"], { queryParams: { nmid: datos.nmid, dsproyecto: datos.dsproyecto, dscliente: datos.dscliente } });
  }


  actualizar(form: FormGroup) {
    this.servicioProyecto.updateProyectos(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }

  refresh() {
    let arrayProyecto: Array<Proyecto> = [];
    this.servicioProyecto.getProyectos().subscribe(datosProyecto => {

      this.datosProyecto = datosProyecto.data;
    })
  }

  setUsuario() {
    Auth.currentUserInfo().then(info => {
      this.usuario = info.username;
    })
  }
}

