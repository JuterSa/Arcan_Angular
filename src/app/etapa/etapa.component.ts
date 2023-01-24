import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { actividad, Etapa } from '../interfaces/etapa';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})

export class EtapaComponent implements OnInit {
  datosEtapa: Array<Etapa> = [];
  actividades: Array<actividad> = [];
  myFormactividad!: FormGroup;
  data: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  myForm!: FormGroup;
  constructor(private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nometapa: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
    });

    this.myFormactividad = this.fb.group({
      actividades: ['', [Validators.required]],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    }
  }

  guardar(myForm: FormGroup) {
    this.datosEtapa.push(myForm.value);
    alert("Se guardó la etapa");
    this.myForm.reset();
  }

  guardara(myFormactividad: FormGroup) {
    this.actividades.push(myFormactividad.value);
    alert("Se guardó nombre actividad");
    this.myFormactividad.reset();
  }

  eliminar(item: any) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datosEtapa.splice(item, 1);
    }
  }

  eliminara(item: any) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.actividades.splice(item, 1);
    }
  }

  opencar(cargararc: any) {
    this.modalService.open(cargararc);
    this.myForm.reset();
  }

  openn(contentn: any) {
    this.modalService.open(contentn);
    this.myForm.reset();
  }

  open(content: any) {
    this.modalService.open(content);
    this.myForm.reset();
  }

  openadd(agregareta: any) {
    this.modalService.open(agregareta);
  }

  addactividad(addactivi: any) {
    this.modalService.open(addactivi);
  }

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.actividades = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.actividades)
    }
  }
}


