import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { DatePipe } from "@angular/common";


import { AppComponent } from './app.component';
import { ZaposleniciComponent } from './zaposlenici/zaposlenici.component';
import { ZaposlenikComponent } from './zaposlenici/zaposlenik/zaposlenik.component';

// servisi
import { ZaposleniciService } from './shared/zaposlenici.service';
import { OdjelService } from './shared/odjel.service';


// nakon otvaranje baze ud firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// nakon otvaranje baze od firebase
import { environment } from "../environments/environment";
import { ListaZaposlenikaComponent } from './zaposlenici/lista-zaposlenika/lista-zaposlenika.component';


@NgModule({
  declarations: [AppComponent, ZaposleniciComponent, ZaposlenikComponent, ListaZaposlenikaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ZaposleniciService, OdjelService, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
