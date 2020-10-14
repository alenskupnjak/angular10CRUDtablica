import { Component, OnInit, ViewChild } from '@angular/core';
import { ZaposleniciService } from '../../shared/zaposlenici.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-zaposlenika',
  templateUrl: './lista-zaposlenika.component.html',
  styleUrls: ['./lista-zaposlenika.component.css'],
})
export class ListaZaposlenikaComponent implements OnInit {
  // preko MatTableDataSource stvaramo poveznicu za rad sa tabelom
  listData: MatTableDataSource<any>;

  brojStranica = [5, 10, 50, 100];

  // definiramo podatke za header za tablicu, odreduje radosled prikaza!
  displayedColumns: string[] = [
    // 'json', 
    'ime', // zapis mora biti isto naziv kao iz polja podataka!
    'email',
    'mobile',
    'grad',
    'odjel',
    'actions',
  ];

  // nužno za rad sortiranja, vidi red **** SORTIRANJE !!!
  @ViewChild(MatSort) sort: MatSort;

  // PAGINATOR ,  vidi red *** PAGINATOR !!!
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(public serviceZaposlenici: ZaposleniciService) {}

  ngOnInit(): void {
    // povlačimo sve podatke iz baze
    this.serviceZaposlenici.dohvatiSveZaposlenike().subscribe((list) => {
      let array = list.map((item) => {
        // let departmentName = this.departmentService.getDepartmentName(
        //   item.payload.val()["department"]
        // );
        return {
          $key: item.key,
          // departmentName: departmentName,
          ...item.payload.val(),
        };
      });
      // stvorena poveznica za tabelu
      this.listData = new MatTableDataSource(array);
      console.log(array);

      // this.listData = new MatTableDataSource(array);
      // **** SORTIRANJE !!!
      this.listData.sort = this.sort;

      // *** PAGINATOR !!!
      this.listData.paginator = this.paginator;

      // this.listData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some((ele) => {
      //     return (
      //       ele != "actions" && data[ele].toLowerCase().indexOf(filter) != -1
      //     );
      //   });
      // };
    });
  }
}
