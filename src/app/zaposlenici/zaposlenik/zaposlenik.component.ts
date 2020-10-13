import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { FormControl } from '@angular/forms';
// import {MatSnackBar} from '@angular/material/snack-bar';

import { ZaposleniciService } from '../../shared/zaposlenici.service';
import { OdjelService } from '../../shared/odjel.service';
import { ObavijestiService } from '../../shared/obavijesti.service';

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
    public obavijesti: ObavijestiService
  ) {}

  ngOnInit(): void {
    // podaci u formi
    this.formdata = this.serviceZaposlenici.getData();
    // Inicijalizacija fireBaze
    this.serviceZaposlenici.dohvatiSveZaposlenike();
  }

  onClear() {
    this.formdata.reset();
  }

  onSubmit() {
    console.log('001', this.formdata.value);

    if (this.formdata.valid) {
      // ako nema $key, insertiramo u bazu
      if (!this.formdata.get('$key').value) {
        console.log(this.formdata.get('ime').value);
        this.serviceZaposlenici.insertZaposlenika(this.formdata.value);
        this.obavijesti.success('Zapisano u bazu');
      } else {
        this.formdata.updateZaposlenika(this.formdata.value);
        this.formdata.reset();
        this.formdata.initializeFormGroup();
        this.obavijesti.success('Zapisano u bazu');
        this.formdata.onClose();
      }
    }
  }
}
