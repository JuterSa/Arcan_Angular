import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from '../interfaces/Roles';
import { Usuarios } from '../interfaces/Usuarios';
import { rolesService } from '../services/roles.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  datosUsuarios: Array<Usuarios> = [];
  myForm!: FormGroup;
  filterPost = '';
  date: Date = new Date();
  arrayUsuarios = new Array<Usuarios>();
  datosRoles: any;
  propiedad='@softcaribbean.com';

  constructor(private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UsuariosService,
    private router: Router, private servicioRol: rolesService) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      cdusuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      cdcorreo: ['', [Validators.required, Validators.email]],
      dsnombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      cdinterno: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      nmrolid: ['', [Validators.required]]
    })


    this.userService.getUsuarios().subscribe(datos => {
      this.datosUsuarios = datos.data;
    });

    let arrayRoles: Array<Rol> = [];
    this.servicioRol.getRoles().subscribe((datos: { data: any; }) => {
      this.datosRoles = datos.data;
    })

  }

  open(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }

  openEdit(content: any) {
    this.modalService.open(content);
  }

  Guardar(form: FormGroup) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.Actualizar(form);
      return;
    }

    this.userService.createUsuarios(form.value).subscribe(
      data => {
        alert("El usuario se ha creado correctamente!");
        this.refresh();
      }
    )
  }

  Editar(datos: {
    nmid: any; cdusuario: any; cdcorreo: any; dsnombre: any; cdestado: any; cdinterno: any; nmrolid: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdusuario: datos.cdusuario,
      cdcorreo: datos.cdcorreo,
      dsnombre: datos.dsnombre,
      cdestado: datos.cdestado,
      cdinterno: datos.cdinterno,
      nmrolid: datos.nmrolid
    })
  }

  Actualizar(form: FormGroup) {
    this.userService.updateUsuario(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
  errorbutton() {
    if (this.myForm.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }

  }

  refresh() {
    this.userService.getUsuarios().subscribe(datos => {
      this.datosUsuarios = datos.data;
    });
  }
  
  nombreUsuario(form: FormGroup) {
    this.myForm.setValue({
      nmid: form.value.nmid,
      cdusuario: form.value.cdcorreo,
      cdcorreo: form.value.cdcorreo + this.propiedad,
      dsnombre: form.value.dsnombre,
      cdestado: form.value.cdestado,
      cdinterno: form.value.cdinterno,
      nmrolid: form.value.nmrolid
    })
  }
}

