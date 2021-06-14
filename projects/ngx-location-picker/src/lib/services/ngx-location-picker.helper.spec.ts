import { TestBed } from '@angular/core/testing';

import { NgxLocationPickerHelper } from './ngx-location-picker.helper';

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
        expectedResult: false,
        keywords: []
      },
      {
        query: 'Groenplaats',
        expectedResult: false,
        keywords: ['kaainummer']
      },
      {
        query: 'Generaal armstrongweg',
        expectedResult: false,
        keywords: ['kaainummer']

      },
      {
        query: 'Generaal armstrongweg 1',
        expectedResult: true,
        keywords: ['kaainummer']
      },
      {
        query: 'Generaal armstrongweg 1A',
        expectedResult: true,
        keywords: ['kaainummer']
      },
      {
        query: 'Kaainummer 757',
        expectedResult: false,
        keywords: ['kaainummer']
      },
      {
        query: 'Kaainummer 15',
        expectedResult: false,
        keywords: ['Kaainummer', 'straatnaam']
      },
      {
        query: 'Kaainummer 20',
        expectedResult: true,
        keywords: []
      }
    ];

    testCases.forEach((test, index) => {
      it(`should test if '${test.query}' isAddress with expectedResult: ${test.expectedResult} and keywords: ${test.keywords}`, () => {
        const result = service.isAddress(test.query, test.keywords);
        expect(result).toEqual(test.expectedResult);
      });
    })
  })
});
