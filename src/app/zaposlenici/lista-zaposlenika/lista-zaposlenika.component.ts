import { Component, OnInit, ViewChild } from '@angular/core';
import { ZaposleniciService } from '../../shared/zaposlenici.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OdjelService } from 'src/app/shared/odjel.service';
import { ObavijestiService } from 'src/app/shared/obavijesti.service';

@Component({
  selector: 'app-lista-zaposlenika',
  templateUrl: './lista-zaposlenika.component.html',
  styleUrls: ['./lista-zaposlenika.component.css'],
})
export class ListaZaposlenikaComponent implements OnInit {
  // preko MatTableDataSource stvaramo poveznicu za rad sa tabelom
  listData: MatTableDataSource<any>;

  brojStranica = [5, 10, 25, 50];

  // definiramo podatke za header za tablicu, odreduje radosled prikaza!
  displayedColumns: string[] = [
    // 'json',
    'ime', // zapis mora biti isto naziv kao iz polja podataka!
    'email',
    'mobile',
    'grad',
    'odjelime',
    'actions',
  ];

  // nužno za rad sortiranja, vidi red **** SORTIRANJE !!!
  @ViewChild(MatSort) sort: MatSort;

  // PAGINATOR ,  vidi red *** PAGINATOR !!!
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Za filter
  searchKey: string;

  constructor(
    public serviceZaposlenici: ZaposleniciService,
    public odjelService: OdjelService,
    public obavijesti: ObavijestiService
  ) {}

  ngOnInit(): void {
    // povlačimo sve podatke iz baze
    this.serviceZaposlenici.dohvatiSveZaposlenike().subscribe((list) => {
      let array = list.map((item) => {
        let odjelime = this.odjelService.getImeOdjela(
          item.payload.val()["odjelSifra"]
        );
        return {
          $key: item.key,
          odjelime: odjelime,
          ...item.payload.val(),
        };
      });
      // stvorena poveznica za tabelu
      this.listData = new MatTableDataSource(array);

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

  // filtriranje podataka
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  // ciscenje filter polja
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }


  onDelete($key) {

          this.serviceZaposlenici.deleteZaposlenika($key);
          this.obavijesti.warn("! Deleted successfully");
    // this.dialogService
    //   .openConfirmDialog("Are you sure to delete this record ?")
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res) {
    //       this.service.deleteEmployee($key);
    //       this.notificationService.warn("! Deleted successfully");
    //     }
    //   });
  }
}
