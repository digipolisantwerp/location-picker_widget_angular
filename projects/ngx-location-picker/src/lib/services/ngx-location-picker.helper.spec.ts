import {TestBed} from '@angular/core/testing';

import {NgxLocationPickerHelper} from './ngx-location-picker.helper';

describe('NgxLocationPickerHelper', () => {

    let service: NgxLocationPickerHelper;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(NgxLocationPickerHelper);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
