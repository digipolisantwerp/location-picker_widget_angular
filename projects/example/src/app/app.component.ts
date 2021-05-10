import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;
  inAntwerp = true;
  countryCodesPlaceHolder = "be,nl,lu";
  countryCodes = ["be","nl","lu"];

  ngOnInit(): void {
    this.baseUrl = 'http://localhost:3000';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }

  onSubmit() {
    this.countryCodes = this.countryCodesPlaceHolder.split(',');
  }
}
