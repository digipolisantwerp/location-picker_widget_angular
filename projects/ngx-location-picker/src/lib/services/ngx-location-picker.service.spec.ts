import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {NgxLocationPickerService} from './ngx-location-picker.service';

describe('NgxLocationPickerService', () => {

    let service: NgxLocationPickerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
        });

        service = TestBed.get(NgxLocationPickerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
