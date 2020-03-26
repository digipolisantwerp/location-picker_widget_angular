import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocationPickerV1Service, LocationPickerV1Value } from '..';

describe('LocationPickerV1Service', () => {
    const testValues: LocationPickerV1Value[] = [{
        id: '0',
        name: 'Zero',
        locationType: 'street'
    }, {
        id: '1',
        name: 'One',
        locationType: 'street'
    }];

    let service: LocationPickerV1Service;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                LocationPickerV1Service
            ]
        });
        service = TestBed.get(LocationPickerV1Service);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should query values via http', (done) => {
        service.getLocationsByQuery('/locations?foo=bar', 'baz', 'street,number').subscribe((res: any) => {
            expect(res).toEqual(testValues);
            done();
        });

        const req = httpMock.expectOne('/locations?foo=bar&search=baz&types=street,number');
        req.flush(testValues);
    });

    it('should error out for an invalid data source', () => {
        expect(() => { service.getLocationsByQuery(42 as any, 'baz', null); }).toThrow();
    });
});
