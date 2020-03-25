import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { LocationPickerV1Component, LocationPickerV1Service, LocationPickerV1Value, LocationPickerV1Module } from '..';
import { of } from 'rxjs';

describe('LocationPickerV1Component', () => {

    let fixture: ComponentFixture<LocationPickerV1Component>;
    let comp: LocationPickerV1Component;
    let element: any;
    let testValues: LocationPickerV1Value[];

    class MockLocationPickerV1Service {
        getLocationsByQuery(dataSource: any, search: string) {
            return of(testValues);
        }
    }

    const provideTestValues = (count: number = 1) => {
        testValues = [];
        for (let i = 0; i < count; i++) {
            testValues.push({
                id: 'test' + i,
                name: 'test ' + i,
                locationType: 'number'
            });
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LocationPickerV1Module],
            providers: [
                { provide: LocationPickerV1Service, useClass: MockLocationPickerV1Service }
            ]
        });
        provideTestValues(1);
        fixture = TestBed.createComponent(LocationPickerV1Component);
        comp = fixture.componentInstance;
        comp.bufferInputMs = 0;
        element = fixture.nativeElement;
    });

    afterEach(() => {
        if (element) {
            document.body.removeChild(element);
        }
    });

    it('should select the text on focus()', (done) => {
        comp.value = testValues[0];
        fixture.detectChanges();
        const input = element.querySelector('input[type=text]');
        input.select = () => { done(); };
        comp.focus();
    });

    it('should not query values for a short text', (done) => {
        comp.minLength = 4;
        comp.ngOnInit();
        fixture.detectChanges();
        const spy = spyOn(comp, 'resetSearchResults');
        const input = element.querySelector('input[type=text]');
        input.value = 'foo';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        setTimeout(() => {
            expect(spy).toHaveBeenCalled();
            done();
        }, 10);
    });

    it('should query values', (done) => {
        provideTestValues(2);
        comp.ngOnInit();
        fixture.detectChanges();
        const input = element.querySelector('input[type=text]');
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        setTimeout(() => {
            expect(comp.searchResults).not.toBeNull();
            expect(comp.searchResults.length).toEqual(2);
            done();
        }, 10);
    });

    it('should clear the search results on value clear', () => {
        comp.value = testValues[0];
        comp.searchResults = testValues;
        fixture.detectChanges();
        comp.writeValue(null);
        expect(comp.searchResults.length).toBe(0);
    });

});

class MockElementRef extends ElementRef {
    constructor() { super(null); }
}
