import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OpcionService } from '../services/opcion.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Opcion } from '../interfaces/Opcion';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})

export class OptionComponent implements OnInit {

  [x: string]: any;
  myForm!: FormGroup;
  filterPost = '';
  datosOpcion: Array<Opcion> = [];
  datosOpcionPadre: Array<Opcion> = [];
  mostrarDatos: boolean = false;
  datosOpcionidpadre: Array<Opcion> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;
  ver: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioOpcion: OpcionService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      cdopcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dsurl: [''],
      dsicono: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      cdpadre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      nmid_padre: ['']
    });

    let arrayOpciones: Array<Opcion> = [];
    this.servicioOpcion.getOpcion().subscribe(datos => {
      this.datosOpcion = datos.data;
    });

    Auth.currentUserInfo().then(info => {

      this.usuario = info.username;

      let arrayOpcionesPadre: Array<Opcion> = [];
      this.servicioOpcion.getOpcionPadre(this.usuario).subscribe(datos => {
        this.datosOpcionPadre = datos.data;
      });
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
    this.servicioOpcion.createOpcion(form.value)
      .subscribe(data => {
        alert("Se guardó el rol con éxito!");
        this.myForm.reset();
        this.refresh();
      }
      )
  }

  editar(datos: { nmid: any; cdopcion: any; dsurl: any; dsicono: any; cdpadre: any; nmid_padre: any }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdopcion: datos.cdopcion,
      dsurl: datos.dsurl,
      dsicono: datos.dsicono,
      cdpadre: datos.cdpadre,
      nmid_padre: datos.nmid_padre,
    })
  }

  actualizar(form: FormGroup) {
    this.servicioOpcion.updateOpcion(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }

  refresh() {
    let arrayOpciones: Array<Opcion> = [];
    this.servicioOpcion.getOpcion().subscribe(datos => {
      this.datosOpcion = datos.data;
    });
  }
}
