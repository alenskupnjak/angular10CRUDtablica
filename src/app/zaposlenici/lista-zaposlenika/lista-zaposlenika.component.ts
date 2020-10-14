import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ZaposlenikComponent } from '../../zaposlenici/zaposlenik/zaposlenik.component';
import { ZaposleniciService } from '../../shared/zaposlenici.service';
import { OdjelService } from 'src/app/shared/odjel.service';
import { ObavijestiService } from 'src/app/shared/obavijesti.service';
import { DialogService } from 'src/app/shared/dialog.service';

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
    public obavijesti: ObavijestiService,
    private dialog: MatDialog, // dialog se mora injektirati
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // povlačimo sve podatke iz baze
    this.serviceZaposlenici.dohvatiSveZaposlenike().subscribe((list) => {
      let array = list.map((item) => {
        let odjelime = this.odjelService.getImeOdjela(
          item.payload.val()['odjelSifra']
        );
        return {
          $key: item.key,
          // odjelime je ubaceno za potrebe ispisa
          // jer je u bazi zapisan sifra odjeal, a ne opis
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
      // stiti pretraživanje podataka polja koja nisu ispisana
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((element) => {
          // console.log('element',element);
          return (
            element != 'actions' &&
            data[element].toLowerCase().indexOf(filter) != -1
          );
        });
      };
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

  // brišemo zapios iz baze
  onDelete($key) {
    // this.serviceZaposlenici.deleteZaposlenika($key);
    // this.obavijesti.warn('! Deleted successfully');
    this.dialogService
      .openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.serviceZaposlenici.deleteZaposlenika($key);
          this.obavijesti.warn('! Deleted successfully');
        }
      });
  }

  // editiranje zaposlenika
  onEdit(row) {
    console.log('onEdit(row), podaci iz forme=', row);
    this.serviceZaposlenici.populateForm(row);
    const dialogConfig = new MatDialogConfig(); // konfigurira window
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(ZaposlenikComponent, dialogConfig);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig(); // konfigurira window
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    // dialogConfig.height = '70%';

    // import { MatDialog} from '@angular/material/dialog';
    // injektirati u servis

    this.dialog.open(ZaposlenikComponent, dialogConfig);
  }

  vidi(element) {
    console.log('******');

    console.log(element);
  }
}
