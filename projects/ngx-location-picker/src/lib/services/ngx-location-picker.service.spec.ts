import {TestBed} from '@angular/core/testing';

import {NgxLocationPickerService} from './ngx-location-picker.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LeafletModule} from '@acpaas-ui/ngx-components/map';

describe('NgxLocationPickerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            LeafletModule
        ],
    }));

    it('should be created', () => {
        const service: NgxLocationPickerService = TestBed.get(NgxLocationPickerService);
        expect(service).toBeTruthy();
    });
});
