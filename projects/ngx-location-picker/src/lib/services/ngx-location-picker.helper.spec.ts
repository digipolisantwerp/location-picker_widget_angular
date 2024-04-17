import { TestBed } from "@angular/core/testing";

import { NgxLocationPickerHelper } from "./ngx-location-picker.helper";

describe("NgxLocationPickerHelper", () => {
  let service: NgxLocationPickerHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(NgxLocationPickerHelper);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isAddressTests", () => {
    const testCases = [
      {
        query: "",
        expectedResult: false,
        keywords: [],
      },
      {
        query: "Groenplaats",
        expectedResult: false,
        keywords: ["kaainummer"],
      },
      {
        query: "Generaal armstrongweg",
        expectedResult: false,
        keywords: ["kaainummer"],
      },
      {
        query: "Generaal armstrongweg 1",
        expectedResult: true,
        keywords: ["kaainummer"],
      },
      {
        query: "Generaal armstrongweg 1A",
        expectedResult: true,
        keywords: ["kaainummer"],
      },
      {
        query: "Kaainummer 757",
        expectedResult: false,
        keywords: ["kaainummer"],
      },
      {
        query: "Kaainummer 15",
        expectedResult: false,
        keywords: ["Kaainummer", "straatnaam"],
      },
      {
        query: "Kaainummer 20",
        expectedResult: true,
        keywords: [],
      },
    ];

    testCases.forEach((test, index) => {
      it(`should test if '${test.query}' isAddress with expectedResult: ${test.expectedResult} and keywords: ${test.keywords}`, () => {
        const result = service.isAddress(test.query, test.keywords);
        expect(result).toEqual(test.expectedResult);
      });
    });
  });

  describe("buildAddressQuery Tests", () => {
    const testCases = [
      {
        query: "",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: [],
        expectedResult: {
          streetname: "",
          streetids: [],
          housenumber: "",
          onlyAntwerp: false,
          countries: [],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "Testen querystraat 35b",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: [],
        buffer: undefined,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "Testen querystraat",
          streetids: [],
          housenumber: "35b",
          onlyAntwerp: false,
          countries: [],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "       Testen te veel trailing spaties straat       15a17a20    ",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: [],
        buffer: undefined,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "Testen te veel trailing spaties straat",
          streetids: [],
          housenumber: "15a17a20",
          onlyAntwerp: false,
          countries: [],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "Testen onlyAntwerpstraat 1A",
        selectedLocation: undefined,
        onlyAntwerp: true,
        countryCodes: [],
        buffer: undefined,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "Testen onlyAntwerpstraat",
          streetids: [],
          housenumber: "1A",
          onlyAntwerp: true,
          countries: [],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "Testen countryCodesstraat 10A",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: ["be","nl","lu"],
        buffer: undefined,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "Testen countryCodesstraat",
          streetids: [],
          housenumber: "10A",
          onlyAntwerp: false,
          countries: ["be","nl","lu"],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "Testen bufferstraat 10A",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: [],
        buffer: 25,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "Testen bufferstraat",
          streetids: [],
          housenumber: "10A",
          onlyAntwerp: false,
          countries: [],
          buffer: 25,
          xcoord: undefined,
          ycoord: undefined
        },
      },
      {
        query: "Testen coördinatenstraat 10A",
        selectedLocation: undefined,
        onlyAntwerp: false,
        countryCodes: [],
        buffer: undefined,
        coordinateSearch: { lat: 51.123, lng: 4.123 },
        expectedResult: {
          streetname: "Testen coördinatenstraat",
          streetids: [],
          housenumber: "10A",
          onlyAntwerp: false,
          countries: [],
          buffer: undefined,
          xcoord: 51.123,
          ycoord: 4.123
        },
      },
      {
        query: "Appelstraat 10A",
        selectedLocation: {
          id: "123",
          name: "test locatie",
          layer: "straat",
          streetNameId: 123456,
          streetName: "Appelstraat",
          postCodes: [2000,2010,2020],
          postCode: 2000,
          antwerpDistrict: "Wilrijk",
          municipality: "Antwerpen",
          label: "test label",
          position: {
            lambert72: undefined,
            wgs84: { lat: 51.123, lng: 4.123 },
            geometryMethod: "test method",
            geometrySpecification: "test specification",
            geometryShape: "test shape",
            geometry: "test geometry",
          }
        },
        onlyAntwerp: false,
        countryCodes: [],
        buffer: undefined,
        coordinateSearch: undefined,
        expectedResult: {
          streetname: "",
          streetids: [123456],
          housenumber: "10A",
          onlyAntwerp: false,
          countries: [],
          buffer: undefined,
          xcoord: undefined,
          ycoord: undefined
        }
      },
      {
        query: "Nationalestraat 5",
        selectedLocation: undefined,
        onlyAntwerp: true,
        countryCodes: ["be","nl","lu"],
        buffer: 2,
        coordinateSearch: { lat: 51.216718, lng: 4.399849 },
        expectedResult: {
          streetname: "Nationalestraat",
          streetids: [],
          housenumber: "5",
          onlyAntwerp: true,
          countries: ["be","nl","lu"],
          buffer: 2,
          xcoord: 51.216718,
          ycoord: 4.399849
        },
      },
    ];

    testCases.forEach((test, index) => {
      it(`should test buildAddressQuery with query: '${test.query}', selectedLocation: '${test.selectedLocation}', onlyAntwerp: '${test.onlyAntwerp}', countryCodes: '${test.countryCodes}', buffer: '${test.buffer}', coordinateSearch: ${test.coordinateSearch}'`, () => {
        const result = service.buildAddressQuery(
          test.query,
          test.selectedLocation,
          test.onlyAntwerp,
          test.countryCodes,
          test.buffer,
          test.coordinateSearch
        );
        expect(result).toEqual(test.expectedResult);
      });
    });
  });
});
