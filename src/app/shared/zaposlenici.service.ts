import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ZaposleniciService {
  constructor() {}

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
    stalnoZaposlenja: new FormControl(false),
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
      stalnoZaposlenja: false
    });
  }

  getData() {
    return this.formdata;
  }
}
