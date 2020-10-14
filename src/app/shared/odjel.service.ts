import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class OdjelService {
  odjeliList: AngularFireList<any>;
  // polje kojjim popunjavamo odjel
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.odjeliList = this.firebase.list('departments');
    console.log(this.odjeliList);
    this.odjeliList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        console.log(`key= ${item.key}`);
        console.log(item.payload.val());
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      // console.log('Odjel polje =' ,this.array);
    });
  }

  getImeOdjela($key) {
    if ($key == '0') {
      return '';
    } else {
      let podatak;
      this.array.forEach((odjel) => {
        if (odjel.$key === $key) {
          podatak = odjel.name;
        }
      });
      return podatak;

      // rijesio sam i bez lodash
      // console.log(
      //   'tu sam= ',
      //   _.find(this.array, (obj) => {
      //     return obj.$key == $key;
      //   })['name']
      // );
    }
  }
}
