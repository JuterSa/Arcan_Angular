import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PendientesService } from '../services/pendientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Pendientes} from '../interfaces/pendientes'

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit, OnDestroy {
  [x: string]: any;
  datosPendientes: Array<Pendientes> = [];
  myFormP!: FormGroup;
  filterPost = '';
  fechaActual = new Date();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioPendientes: PendientesService) {

      config.backdrop = 'static';
      config.keyboard = false;
      
     }

  ngOnInit(): void {
    this.myFormP = this.fb.group({
      nmid_pendiente:[''],
      //fk_bitacora:[],
      dtfechareporte: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dspendiente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      dsreportado: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      dtfechagestion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dsgestion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]

    }); 
    this.route.queryParams.subscribe(params => {
      //this.fk_bitacora = params.nmid_bitacora
      //this.myForm.get('fk_bitacora')?.setValue(this.fk_bitacora);
      let arrayPendientes: Array<Pendientes> = [];
    this.servicioPendientes.getPendientesByBitacora(params.nmid_bitacora).subscribe(datos => {
      this.datosPendientes = datos.data;
    });
    });

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
    this.myFormP.reset();
    //this.myFormPendiente.reset();
  }
  openEdit(content: any) {
    this.modalService.open(content);
  }
  editar(datos: { nmid_pendiente: any; dtfechareporte: any; dspendiente: any; dsreportado: any; dtfechagestion: any; dsgestion: any; cdestado: any; }) {
    this.myFormP.setValue({
      nmid_pendiente: datos.nmid_pendiente,
      dtfechareporte: datos.dtfechareporte,
      dspendiente: datos.dspendiente,
      dsreportado: datos.dsreportado,
      dtfechagestion: datos.dtfechagestion,
      dsgestion: datos.dsgestion,
      cdestado: datos.cdestado
    })
  }
  guardar(form: FormGroup) {
    if (this.myFormP.valid) {
      if (form.value.nmid_pendiente && form.value.nmid_pendiente !== 0) {
        this.actualizar(form);
        return;
      }
      this.servicioPendientes.createPendientes(form.value)
        .subscribe(data => {
          alert("Pendiente modificado con exito!");
          this.myFormP.reset();
          this.refresh();
        }
        )

    }
    else {
      alert('Formualario inválido')
    }

  }
  actualizar(form: FormGroup) {
    this.servicioPendientes.updatePendientes(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
  refresh() {
    this.route.queryParams.subscribe(params => {
      //this.fk_bitacora = params.nmid_bitacora
      //this.myForm.get('fk_bitacora')?.setValue(this.fk_bitacora);
      let arrayPendientes: Array<Pendientes> = [];
    this.servicioPendientes.getPendientesByBitacora(params.nmid_bitacora).subscribe(datos => {
      this.datosPendientes = datos.data;
    });
    });
  }
  errorbuttontwo() {
    if (this.myFormP.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }
  }

}
