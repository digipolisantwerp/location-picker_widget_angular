import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocationPickerV1Value } from './location-picker.types';

@Injectable()
export class LocationPickerV1Service {
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
        types: string
    ): Observable<LocationPickerV1Value[]> {
        if (typeof dataSource === 'string') {
            const uri = dataSource +
                ((dataSource.indexOf('?') < 0) ? '?' : '&') +
                'search=' + search +
                (types ? '&types=' + types : '');
            return this.http.get<LocationPickerV1Value[]>(uri);
        } else {
            // should never happen
            throw new TypeError('unsupported dataSource type "' + (typeof dataSource) + '"');
        }
    }
}
