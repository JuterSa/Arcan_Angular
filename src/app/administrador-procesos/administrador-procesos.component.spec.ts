import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorProcesosComponent } from './administrador-procesos.component';

describe('AdministradorProcesosComponent', () => {
  let component: AdministradorProcesosComponent;
  let fixture: ComponentFixture<AdministradorProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorProcesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
