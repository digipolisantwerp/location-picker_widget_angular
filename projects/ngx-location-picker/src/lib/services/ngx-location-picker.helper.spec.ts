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

    describe('isAddressTests', () => {
        const testCases = [
            {
                query: '',
                expectedResult: false
            },
            {
                query: 'Groenplaats',
                expectedResult: false
            },
            {
                query: 'Generaal armstrongweg',
                expectedResult: false
            },
            {
                query: 'Generaal armstrongweg 1',
                expectedResult: true
            },
            {
                query: 'Generaal armstrongweg 1A',
                expectedResult: true
            },
            {
                query: 'Kaainummer 757',
                expectedResult: false
            }
        ];

        testCases.forEach((test, index) => {
            it(`should test if '${test.query}' isAddress with expectedResult: ${test.expectedResult}`, () => {
                const result = service.isAddress(test.query);
                expect(result).toEqual(test.expectedResult);
            });
        })
    })
});
