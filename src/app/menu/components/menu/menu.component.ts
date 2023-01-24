import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opcion } from 'src/app/interfaces/Opcion';
import { OpcionService } from '../../../services/opcion.service';
import { Auth } from "aws-amplify";

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  [x: string]: any;
  datosOpcionPadre: Array<Opcion> = [];
  datosOpcion: Array<Opcion> = [];
  mobileQuery: MediaQueryList;
  usuario = '';
  isShown: boolean = false;
  cambio: number = 0;

  _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private servicioOpcion: OpcionService, private router: Router, private route: ActivatedRoute) {
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', () => {
      this._mobileQueryListener();
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {

    Auth.currentUserInfo().then(info => {
      this.usuario = info.username;
      let arrayOpcionesPadre: Array<Opcion> = [];
      this.servicioOpcion.getOpcionPadre(this.usuario).subscribe(datos => {
        this.datosOpcionPadre = datos.data;
      });
    })
    this.setUsuario();
  }

  mostrarHijo(nmid_padre: any) {
    Auth.currentUserInfo().then(info => {
      this.servicioOpcion.getOpcionidpadre(this.usuario, nmid_padre).subscribe(datos => {
        this.datosOpcionidpadre = datos.data;
      });
    });
  }

  ocultar(nmid_padre: any) {
    if (!this.isShown && this.cambio == 0) {
      this.cambio = nmid_padre;
      this.isShown = true;
    } else if (this.isShown && this.cambio == nmid_padre) {
      this.cambio = 0;
      this.isShown = false;
    } else if (this.isShown && this.cambio != nmid_padre) {
      this.cambio = nmid_padre;
      this.isShown = true;
    };
  }

  setUsuario() {
    Auth.currentUserInfo().then(info => {
      this.usuario = info.username;
    })
  };
}
