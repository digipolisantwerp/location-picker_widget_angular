import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
    Observable,
    Observer,
} from 'rxjs';
import {
    debounceTime,
    mergeMap,
} from 'rxjs/operators';

import { AutoCompleteComponent } from '@acpaas-ui/ngx-components/forms';
import { LocationPickerValue } from './location-picker.types';
import { LocationPickerService } from './location-picker.service';

@Component({
    selector: 'aui-location-picker',
    templateUrl: './location-picker.component.html',
    styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent
    // ControlValueAccessor as per
    // https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
    implements OnInit, ControlValueAccessor {

    // see set data below
    private _data: LocationPickerValue[];

    /**
     * The URL to the BFF.
     */
    @Input() public url;
    /** what to show in the input field when blank */
    @Input() public placeholder = '';
    /** minimum number of characters typed before search is triggered */
    @Input() public minLength = 2;
    /** message to show when there are no hits */
    @Input() public noDataMessage = 'Geen resultaat gevonden';
    /** the type of values to search for, comma-separated list of "street", "number" or "poi" */
    @Input() public types = 'street,number,poi';
    /* the manner in which the user would like to sort results, by default sorting by name happens */
    @Input() public sort = 'name';
    /** the value that is displayed */
    @Input() public value: LocationPickerValue;
    /** how long to buffer keystrokes before requesting search results */
    @Input() public bufferInputMs = 500;
    /** the event fired when the value changes */
    @Output() public valueChange: EventEmitter<LocationPickerValue> =
        new EventEmitter<LocationPickerValue>();

    /** the results in the auto-complete list */
    public searchResults: LocationPickerValue[];
    /** monitors changes in the query value to search for */
    private searchChange$: Observer<string>;
    /** the autocomplete component */
    @ViewChild(AutoCompleteComponent)
    public autocomplete: AutoCompleteComponent;

    /** used to implement ControlValueAccessor (see below) */
    private propagateChange = (_: any) => {};

    constructor(
        private locationService: LocationPickerService,
        private element: ElementRef
    ) {}

    /** Set the focus in the text field, selecting all text. */
    public focus() {
        const nativeEl = this.element.nativeElement;
        if (nativeEl && nativeEl.querySelector) {
            const input = nativeEl.querySelector('input[type=text]');
            if (input) {
                input.select();
            }
        }
    }

    public ngOnInit() {
        this.resetSearchResults();

        // trigger an autocomplete search when the query string changes
        Observable.create((observer) => {
            this.searchChange$ = observer;
        })
            .pipe(
              debounceTime(this.bufferInputMs),
              mergeMap((search) =>
                this.locationService.getLocationsByQuery(this.url, String(search), this.types, this.sort)
              )
            )
            .subscribe((results) => {
                this.searchResults = results;
            });
    }

    /** revert the search results to the current value of the control */
    public resetSearchResults() {
        this.searchResults = [];
        // if an initial value is set, focusing+blurring the field
        // should not clear the field
        if (this.value && !this.searchResults.length) {
            this.searchResults = [this.value];
        }
    }

    public onSearch(searchString: string) {
        if (searchString.length >= this.minLength) {
            this.searchChange$.next(searchString);
        } else {
            this.resetSearchResults();
        }
    }

    public onSelect(data: Event | LocationPickerValue) {
        if (data instanceof Event) {
            // do nothing: we don't respond to text selection events
        } else {
            this.writeValue(data as LocationPickerValue);
        }
    }

    public formatLabel(input: LocationPickerValue): string {
        const search = this.autocomplete.query;
        const inputString = input.name || input.id || '';
        const regEx = new RegExp(search, 'ig');
        return inputString.replace(regEx, (match) => '<strong>' + match + '</strong>');
    }

    // ControlValueAccessor interface

    public writeValue(value: LocationPickerValue|any) {
        this.value = value as LocationPickerValue;
        this.valueChange.emit(this.value);
        if (this.propagateChange) {
            this.propagateChange(this.value);
        }
        this.resetSearchResults();
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

}
