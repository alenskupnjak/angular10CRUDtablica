import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ZaposleniciComponent } from './zaposlenici/zaposlenici.component';
import { ZaposlenikComponent } from './zaposlenici/zaposlenik/zaposlenik.component';
import { ZaposleniciService } from './shared/zaposlenici.service';

@NgModule({
  declarations: [AppComponent, ZaposleniciComponent, ZaposlenikComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [ZaposleniciService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
