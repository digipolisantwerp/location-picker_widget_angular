import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocationPickerService, LocationPickerValue } from '..';

describe('LocationPickerService', () => {
  const testValues: LocationPickerValue[] = [{
    id: '0',
    name: 'Zero',
    locationType: 'street'
  }, {
    id: '1',
    name: 'One',
    locationType: 'street'
  }];

  let service: LocationPickerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LocationPickerService
      ]
    });
    service = TestBed.get(LocationPickerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should query location values via http', (done) => {
    service.getLocationsByQuery('http://some-uri?foo=bar', 'baz', 'street,number').subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne('http://some-uri/locations?foo=bar&search=baz&types=street,number');
    req.flush(testValues);
  });

  it('should query coordinates via http', (done) => {
    service.getLocationByCoordinates('http://some-uri?foo=bar', { lat: 0.1234, lng: 0.1234 }).subscribe((res: any) => {
      expect(res).toEqual(testValues);
      done();
    });

    const req = httpMock.expectOne('http://some-uri/coordinates?foo=bar&lat=0.1234&lng=0.1234');
    req.flush(testValues);
  });

  it('should error out for an invalid data source', () => {
    expect(() => { service.getLocationsByQuery(42 as any, 'baz', null); }).toThrow();
    expect(() => { service.getLocationByCoordinates(42 as any, { lat: 0.1234, lng: 0.1234 }); }).toThrow();
  });
});
