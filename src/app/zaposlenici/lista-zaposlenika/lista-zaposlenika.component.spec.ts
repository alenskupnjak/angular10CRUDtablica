import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { ListaZaposlenikaComponent } from './lista-zaposlenika.component';

describe('ListaZaposlenikaComponent', () => {
  let component: ListaZaposlenikaComponent;
  let fixture: ComponentFixture<ListaZaposlenikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaZaposlenikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaZaposlenikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
