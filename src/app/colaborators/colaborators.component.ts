import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto_Usuario } from '../interfaces/Proyecto_Usuario';
import { ProyectoUsuarioService } from '../services/proyecto-usuario.service';
import { rolesService } from '../services/roles.service';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from '../interfaces/cargo';
import { CargoService } from '../services/cargo.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuarios } from '../interfaces/Usuarios';

declare var $: any;

@Component({
  selector: 'app-colaborators',
  templateUrl: './colaborators.component.html',
  styleUrls: ['./colaborators.component.scss']
})
export class ColaboratorsComponent implements OnInit, OnDestroy {

  [x: string]: any;
  datosProyecto_Usuario: Array<Proyecto_Usuario> = [];
  datosCargo: Array<Cargo> = [];
  datosUsuario: Array<Usuarios> = [];
  myForm!: FormGroup;
  filterPost = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioProyecto_Usuario: ProyectoUsuarioService, private servicioRol: rolesService, private servicioCargo: CargoService, private servicioUsuario: UsuariosService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      nmusuarioid: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      nmproyectoid: [],
      nmcargoid: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });

    this.route.queryParams.subscribe(params => {
      this.dsproyecto = params.dsproyecto,
        this.dscliente = params.dscliente,
        this.nmproyectoid = params.nmid,
        this.myForm.get('nmproyectoid')?.setValue(params.nmid)
      });
      let arrayProyecto_Usuario: Array<Proyecto_Usuario> = [];
      this.servicioProyecto_Usuario.getProyectoUsuarioId(this.nmproyectoid)
        .subscribe(datos => {
          this.datosProyecto_Usuario = datos.data;
    });

    let arrayCargos: Array<Cargo> = [];
    this.servicioCargo.getCargos().subscribe(datos => {
      this.datosCargo = datos.data;
    })

    let arrayUsuarios: Array<Usuarios> = [];
    this.servicioUsuario.getUsuarios().subscribe(datos => {
      this.datosUsuario = datos.data;
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    }
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

  guardar(form: FormGroup) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        return;
      }
      this.servicioProyecto_Usuario.createProyecto_Usuario(form.value)
        .subscribe(data => {
          alert("Se guardó con exito!!!");
          this.myForm.reset();
          this.refresh();
        }
        )
    }

    editar(datos: {nmid: any; cdestado: any; nmusuarioid: any; nmproyectoid: any; nmcargoid: any;}) {
     this.myForm.setValue({
        nmid: datos.nmid,
        nmusuarioid: datos.nmusuarioid,
        nmproyectoid: datos.nmproyectoid,
        nmcargoid: datos.nmcargoid,
        cdestado: datos.cdestado,
      })
    };



    actualizar(form: FormGroup) {
        this.servicioProyecto_Usuario.updateColaborador(form.value)
          .subscribe(data => {
            alert("Se actualizó con exito!!!");
            this.refresh();
          });
      }


    refresh() {

      this.route.queryParams.subscribe(params => {
        this.dsproyecto = params.dsproyecto,
          this.dscliente = params.dscliente,
          this.nmproyectoid = params.nmid,
          this.myForm.get('nmproyectoid')?.setValue(params.nmid)

        let arrayProyecto_Usuario: Array<Proyecto_Usuario> = [];
        this.servicioProyecto_Usuario.getProyectoUsuarioId(this.nmproyectoid)
          .subscribe(datos => {
            this.datosProyecto_Usuario = datos.data;
          });
      });
    }
  }
