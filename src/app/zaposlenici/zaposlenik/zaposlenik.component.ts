import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { FormControl } from '@angular/forms';

import { ZaposleniciService } from '../../shared/zaposlenici.service';

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
    { id: 'dep-0', viewValue: 'Nabave' },
    { id: 'dep-1', viewValue: 'Prodaje' },
    { id: 'dep-2', viewValue: 'Razvoj' },
  ];

  // podaci forme
  formdata;
  constructor(public seviceZaposlenici: ZaposleniciService) {}

  ngOnInit(): void {
    // podaci u formi
    this.formdata = this.seviceZaposlenici.getData();
  }

  onClear() {
    this.formdata.reset();
  }

  onVidi() {
    console.log(this.formdata);
  }
}
