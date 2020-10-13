import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class OdjelService {
  odjeliList: AngularFireList<any>;
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
      console.log(this.array);
    });
  }
}
