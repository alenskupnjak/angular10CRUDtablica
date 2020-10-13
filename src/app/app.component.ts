import { Component, isDevMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular10CRUDtablica';

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development Mode! Angular10CRUDtablica');
    } else {
      console.log('Cool. Production! Angular10CRUDtablica');
    }
  }
}
