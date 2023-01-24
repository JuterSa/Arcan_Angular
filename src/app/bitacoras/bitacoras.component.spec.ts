import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacorasComponent } from './bitacoras.component';

describe('BitacorasComponent', () => {
  let component: BitacorasComponent;
  let fixture: ComponentFixture<BitacorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
