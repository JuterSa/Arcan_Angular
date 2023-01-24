import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Opcion } from '../interfaces/Opcion';
import { OpcionRol } from '../interfaces/OpcionRol'
import { OpcionRolService } from '../services/opcion-rol.service';
import { OpcionService } from '../services/opcion.service';

@Component({
  selector: 'app-rol-option',
  templateUrl: './rol-option.component.html',
  styleUrls: ['./rol-option.component.scss']
})
export class RolOptionComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private servicioOpcion: OpcionService, private servicioOpcionRol: OpcionRolService, private http: HttpClient,) { }

  [x: string]: any;
  datosOpcionPadre: Array<Opcion> = [];
  datosOpcionRol: Array<OpcionRol> = [];
  opcionHijo = false;
  myForm!: FormGroup;
  cambio : number = 0;

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      nmrolid: ['', Validators.required],
      nmopcionid: [''],
    });
    this.route.queryParams.subscribe(params => {
      this.nmrolid = params.nmid,
        this.myForm.get('nmrolid')?.setValue(params.nmid)
    });


    let arrayRolOpcion: Array<OpcionRol> = [];
    this.servicioOpcionRol.getOpcionesHijo(this.nmid_padre).subscribe(datos => {
      this.datosRolOpcion = datos.data;
    })

    Auth.currentUserInfo().then(info => {

      this.usuario = info.username;

      let arrayOpcionesPadre: Array<Opcion> = [];
      this.servicioOpcion.getOpcionPadre(this.usuario).subscribe(datos => {
        this.datosOpcionPadre = datos.data;
      });
    })



    this.route.queryParams.subscribe(params => {
      this.cdrol = params.cdrol,
        this.nmrolid = params.nmid,
        this.myForm.get('nmrolid')?.setValue(params.nmid)
    });
  }

  mostrarOpcionHijo(nmid_padre: number) {

    if (!this.opcionHijo && this.cambio == 0) {
      this.cambio = nmid_padre;
      this.opcionHijo = true;
    } else if (this.opcionHijo && this.cambio == nmid_padre){
      this.cambio = 0;
      this.opcionHijo = false;
    }else if (this.opcionHijo && this.cambio != nmid_padre){
      this.cambio = nmid_padre;
      this.opcionHijo = true;
    }

    this.route.queryParams.subscribe(params => {
      this.nmrolid = params.nmid,
        this.myForm.get('nmrolid')?.setValue(params.nmid);
      this.servicioOpcionRol.getOpcionesroles(nmid_padre, this.nmrolid).subscribe(datos => {
        this.datosRolOpcion = datos.data;
      })
    });

    let arrayRolOpcion: Array<OpcionRol> = [];

  }

  guardar(form: FormGroup) {
    console.log(this.datosRolOpcion);

    this.servicioOpcionRol.createOpcion(this.datosRolOpcion)
      .subscribe(data => {
        this.myForm.patchValue({
          nmid: [''],
          nmrolid: ['', Validators.required],
          nmopcionid: [''],
          selected: []

        })
        this.route.queryParams.subscribe(params => {

          this.nmrolid = params.nmid,
            this.myForm.get('nmrolid')?.setValue(params.nmid)

        });
      }
      )
    this.cerrarOpcionHijo();
  }

  editar(datos: { nmid: any; nmrolid: any; nmopcionid: any; cdestado: any }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      nmrolid: datos.nmrolid,
      nmopcionid: datos.nmopcionid,
    })
    this.opcionHijo = !this.opcionHijo;
  }

  actualizar(form: FormGroup) {

    this.route.queryParams.subscribe(params => {
      this.nmrolid = params.nmid,
        this.myForm.get('nmrolid')?.setValue(params.nmid)

      this.servicioOpcionRol.updateOpcion(form.value)
        .subscribe(data => {
          alert("Se actualizó con exito!!!")
        });
    });
  }

  guardarCambios() {
    this.guardar
  }

  cerrarOpcionHijo() {
    this.opcionHijo = !this.opcionHijo;
  }
}
