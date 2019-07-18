import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InitialLocationModel} from '../../../ngx-location-picker/src/lib/types/initial-location.model';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';
    selectedLocation: InitialLocationModel = {
        label: 'Francis Wellesplein 1, 2018 Antwerpen',
        position:  {
            lat: 51.20582713100443,
            lng: 4.3984563736866935
        }
    };
    selectedLocationModel = this.selectedLocation;

    exampleForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.baseUrl = `https://locationpicker-app1-o.antwerpen.be`;

        this.exampleForm = this.formBuilder.group({
            selectedLocation: ['']
        });
    }

    onSubmitNgModel() {
        console.log('NgModel value:', this.selectedLocationModel);
    }

    onSubmitReactive() {
        console.log('Reactive form value:', this.exampleForm.get('selectedLocation').value);
    }
}
