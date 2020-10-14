import { Component, OnInit } from '@angular/core';

import { ZaposleniciService } from '../../shared/zaposlenici.service';
import { OdjelService } from '../../shared/odjel.service';
import { ObavijestiService } from '../../shared/obavijesti.service';
import { MatDialogRef } from '@angular/material/dialog';

interface Odjel {
  id: string;
  viewValue: string;
}
@Component({
  moduleId: 'module.id',
  selector: 'app-zaposlenik',
  templateUrl: './zaposlenik.component.html',
  styleUrls: ['./zaposlenik.component.css'],
})
export class ZaposlenikComponent implements OnInit {
  odjeli: Odjel[] = [
    { id: 'abc1', viewValue: 'Nabave' },
    { id: 'abc2', viewValue: 'Prodaje' },
    { id: 'abc3', viewValue: 'Razvoj' },
    { id: 'abc4', viewValue: 'Održavanje' },
  ];

  // podaci forme
  formdata;

  constructor(
    public serviceZaposlenici: ZaposleniciService,
    public odjelService: OdjelService,
    public obavijesti: ObavijestiService,
    public dialogRef: MatDialogRef<ZaposlenikComponent>
  ) {}

  ngOnInit(): void {
    // podaci u formi
    this.formdata = this.serviceZaposlenici.getData();
    // Inicijalizacija fireBaze
    this.serviceZaposlenici.dohvatiSveZaposlenike();

    // console.log('xx',this.formdata.controls['$key'].value);
    console.log('xx?',this.formdata.controls.email);
  }

  onClear() {
    this.formdata.reset();
  }

  onSubmit() {
    console.log('001', this.formdata.value);

    if (this.formdata.valid) {
      // ako nema $key, insertiramo u bazu
      if (!this.formdata.get('$key').value) {
        // console.log(this.formdata.get('ime').value);
        this.serviceZaposlenici.insertZaposlenika(this.formdata.value);
        this.obavijesti.success('Zapisano u bazu.');
      } else {
        this.serviceZaposlenici.updateZaposlenika(this.formdata.value);
        this.formdata.reset();
        this.serviceZaposlenici.initializeFormGroup();
        this.onClose();
        this.obavijesti.success('Podaci u bazi su promjenjeni');
      }
    }
  }


  onClose() {
    this.serviceZaposlenici.formdata.reset();
    this.serviceZaposlenici.initializeFormGroup();
    this.dialogRef.close();
  }
}
