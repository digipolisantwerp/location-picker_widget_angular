import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocationPickerValue } from './location-picker.types';

@Injectable()
export class LocationPickerService {
    constructor(
        private http: HttpClient
    ) {}

    public getLocationsByQuery(
        /**
         * The URL for contacting the BFF,
         * appending search=<search> as query argument.
         */
        dataSource: string,
        /** The string to search for */
        search: string,
        /** The types of locations to search for (comma-separated) */
        types: string,
        /** The way to sort (name by default) */
        sort: string
    ): Observable<LocationPickerValue[]> {
        if (typeof dataSource === 'string') {
            const uri = dataSource +
                ((dataSource.indexOf('?') < 0) ? '?' : '&') +
                'search=' + search +
                (types ? '&types=' + types : '') +
                (sort ? '&sort=' + sort : '');
            return this.http.get<LocationPickerValue[]>(uri);
        } else {
            // should never happen
            throw new TypeError('unsupported dataSource type "' + (typeof dataSource) + '"');
        }
    }
}
