import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';

    ngOnInit(): void {
        if (location.origin.includes('localhost')) {
            this.baseUrl = `http://localhost:3000/api/v1`;
        } else {
            this.baseUrl = `${location.origin}/api/v1`;
        }
    }

}
