import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DatePipe } from '@angular/common';

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
    odjel: new FormControl(0),
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
      odjel: 0,
      datumZaposlenja: '',
      stalnoZaposlenje: false,
    });
  }

  dohvatiSveZaposlenike() {
    this.zaposlenici = this.firebase.list('ang10CRUDtable');
    return this.zaposlenici.snapshotChanges();
  }

  insertZaposlenika(zaposlenik) {
    console.log('xxxxxx',zaposlenik);

    this.zaposlenici.push({
      ime: zaposlenik.ime,
      email: zaposlenik.email,
      mobile: zaposlenik.mobile,
      grad: zaposlenik.grad,
      spol: zaposlenik.spol,
      odjel: zaposlenik.odjel,
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
      odjel: zaposlenik.odjel,
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

  getData() {
    return this.formdata;
  }
}
