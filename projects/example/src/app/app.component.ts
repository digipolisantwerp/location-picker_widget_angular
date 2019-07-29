import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';
    selectedLocationModel;

    ngOnInit(): void {
        this.baseUrl = 'https://locationpicker-app1-o.antwerpen.be/api/v1';
    }

    onSubmitNgModel() {
        console.log('NgModel value:', this.selectedLocationModel);
    }
}
