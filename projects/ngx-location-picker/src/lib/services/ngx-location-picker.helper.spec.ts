import {TestBed} from '@angular/core/testing';

import {NgxLocationPickerHelper} from './ngx-location-picker.helper';

describe('NgxLocationPickerHelper', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NgxLocationPickerHelper = TestBed.get(NgxLocationPickerHelper);
        expect(service).toBeTruthy();
    });
});
