import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';

    ngOnInit(): void {
        this.baseUrl = `https://locationpicker-app1-o.antwerpen.be`;
    }

}
