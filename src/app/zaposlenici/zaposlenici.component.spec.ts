import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniciComponent } from './zaposlenici.component';

describe('ZaposleniciComponent', () => {
  let component: ZaposleniciComponent;
  let fixture: ComponentFixture<ZaposleniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
