import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;

  ngOnInit(): void {
    this.baseUrl = 'https://locationpicker-app1-o.antwerpen.be';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }
}
