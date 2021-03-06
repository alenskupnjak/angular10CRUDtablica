import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ZaposleniciService {
  constructor(
    private firebase: AngularFireDatabase,
    private datePipe: DatePipe
  ) {}

  zaposlenici: AngularFireList<any>;

  formdata: FormGroup = new FormGroup({
    // $ zbci da je unique- vrijednost
    $key: new FormControl(null),
    ime: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(5)]),
    grad: new FormControl(''),
    spol: new FormControl('1'),
    odjelSifra: new FormControl(0),
    datumZaposlenja: new FormControl(''),
    stalnoZaposlenje: new FormControl(false),
  });

  initializeFormGroup() {
    this.formdata.setValue({
      $key: null,
      ime: '',
      email: '',
      mobile: '',
      grad: '',
      spol: '1',
      odjelSifra: 0,
      datumZaposlenja: '',
      stalnoZaposlenje: false,
    });
  }

  // iz baze povlači sve podatke
  dohvatiSveZaposlenike() {
    this.zaposlenici = this.firebase.list('ang10CRUDtable');
    return this.zaposlenici.snapshotChanges();
  }

  insertZaposlenika(zaposlenik) {
    this.zaposlenici.push({
      ime: zaposlenik.ime,
      email: zaposlenik.email,
      mobile: zaposlenik.mobile,
      grad: zaposlenik.grad,
      spol: zaposlenik.spol,
      odjelSifra: zaposlenik.odjelSifra,
      datumZaposlenja:
        zaposlenik.datumZaposlenja == ''
          ? ''
          : this.datePipe.transform(zaposlenik.datumZaposlenja, 'yyyy-MM-dd'),
      stalnoZaposlenje: zaposlenik.stalnoZaposlenje,
    });
  }

  updateZaposlenika(zaposlenik) {
    this.zaposlenici.update(zaposlenik.$key, {
      ime: zaposlenik.ime,
      email: zaposlenik.email,
      mobile: zaposlenik.mobile,
      grad: zaposlenik.grad,
      spol: zaposlenik.spol,
      odjelSifra: zaposlenik.odjelSifra,
      datumZaposlenja:
        zaposlenik.datumZaposlenja == ''
          ? ''
          : this.datePipe.transform(zaposlenik.datumZaposlenja, 'yyyy-MM-dd'),
      stalnoZaposlenje: zaposlenik.stalnoZaposlenje,
    });
  }

  deleteZaposlenika($key: string) {
    this.zaposlenici.remove($key);
  }

  // povlačimo podatke
  getData() {
    return this.formdata;
  }

  //
  populateForm(zaposlenik) {
    console.log('opulateForm(zaposlenik) zaposlenik=',zaposlenik);
    console.log('_omit pulateForm(zaposlenik) zaposlenik=',_.omit(zaposlenik, 'odjelime'));

    // lodash _omit izbacuje zeljenu vrijednost iz polja
    this.formdata.setValue(_.omit(zaposlenik, 'odjelime'));
  }
}
