import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bitacoras } from '../interfaces/bitacoras';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BitacorasService } from '../services/bitacoras.service';
import { PendientesService } from '../services/pendientes.service';

@Component({
  selector: 'app-bitacoras',
  templateUrl: './bitacoras.component.html',
  styleUrls: ['./bitacoras.component.scss']
})
export class BitacorasComponent implements OnInit , OnDestroy{
  [x: string]: any;
  datosBitacora: Array<Bitacoras> = [];
  datosCountPendiente: Array<Bitacoras> = [];
  myForm!: FormGroup;
  myFormP!: FormGroup;
  filterPost = '';
  fechaActual = new Date();
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioBitacora: BitacorasService, private servicioPendiente: PendientesService) {

      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit(): void {
    
    this.myForm = this.fb.group({
      nmid_bitacora: [''],
      dtfechainicio: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dtfechafin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dsobservacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(400)]]
    })

    this.myFormP = this.fb.group({
      nmid_pendiente:[''],
      fk_bitacora:[''],
      dtfechareporte: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dspendiente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      dsreportado: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      dtfechagestion: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dsgestion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
    
    let arrayBitacora: Array<Bitacoras> = [];
    this.servicioBitacora.getBitacora().subscribe(datos => {
      this.datosBitacora = datos.data;
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
    this.myForm.reset();
    this.myFormP.reset();
  }
  openEdit(content: any) {
    this.modalService.open(content);
  }
  editar(datos: { nmid_bitacora: any; dtfechainicio: any; dtfechafin: any; dsobservacion: any; }) {
    this.myForm.setValue({
      nmid_bitacora: datos.nmid_bitacora,
      dtfechainicio: datos.dtfechainicio,
      dtfechafin: datos.dtfechafin,
      dsobservacion: datos.dsobservacion
    })
  }
  /*addID(datos: {nmid: any}){
    this.myFormP.setValue({
      nmid_bitacora: datos.nmid   
    })
    //this.myFormP.get('nmid_bitacora')?.setValue(datos)

  }*/
  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid_bitacora && form.value.nmid_bitacora !== 0) {
        this.actualizar(form);
        return;
      }
      this.servicioBitacora.createBitacora(form.value)
        .subscribe(data => {
          alert("Registro semanal agregado!");
          this.myForm.reset();
          this.refresh();
        }
        )

    }
    else {
      alert('Formualario inválido')
    }

  }
  guardarPendiente(form: FormGroup) {
    if (this.myFormP.valid) {
      if (form.value.nmid_pendiente && form.value.nmid_pendiente !== 0) {
        this.actualizarPendiente(form);
        return;
      }
      this.servicioPendiente.createPendientes(form.value)
        .subscribe(data => {
          alert("Pendiente agregado con exito!");
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
    this.servicioBitacora.updateBitacora(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
  actualizarPendiente(form: FormGroup) {
    this.servicioPendiente.updatePendientes(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
  refresh() {
    let arrayBitacora: Array<Bitacoras> = [];
    this.servicioBitacora.getBitacora().subscribe(datos => {
      this.datosBitacora = datos.data;
    });

  }
  errorbutton() {
    if (this.myForm.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }
   
  }
  errorbuttontwo(){
     if (this.myFormP.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }
  }
  verPendientes(datos: { nmid_bitacora: any}) {
    this.router.navigate(["pendientes"], { queryParams: { nmid_bitacora: datos.nmid_bitacora} });
  }

}
