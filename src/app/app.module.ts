import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ZaposleniciComponent } from './zaposlenici/zaposlenici.component';
import { ZaposlenikComponent } from './zaposlenici/zaposlenik/zaposlenik.component';

@NgModule({
  declarations: [AppComponent, ZaposleniciComponent, ZaposlenikComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
