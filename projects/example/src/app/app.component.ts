import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;

  ngOnInit(): void {
    this.baseUrl = 'http://localhost:3000';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }
}
