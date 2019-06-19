import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {
  LocationPickerValue,
  LatLngCoordinate,
} from './location-picker.types';

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
     types: string
     ): Observable<LocationPickerValue[]> {
    if (typeof dataSource === 'string') {
      const dataParts = this.analyseDataSource(dataSource);
      const uri = dataParts.uri +
        '/locations' +
        dataParts.params +
        'search=' + search +
        (types ? '&types=' + types : '');
      return this.http.get<LocationPickerValue[]>(uri);
    } else {
      // should never happen
      throw new TypeError('unsupported dataSource type "' + (typeof dataSource) + '"');
    }
  }

  public getLocationByCoordinates(
    /**
     * The URL for contacting the BFF,
     * appending search=<search> as query argument.
     */
     dataSource: string,
     /** The latitude and longitude coordinates to searxh for */
     latLong: LatLngCoordinate
     ): Observable<any> {
    if (typeof dataSource === 'string') {
      const dataParts = this.analyseDataSource(dataSource);
      const uri = dataParts.uri +
        '/coordinates' +
        dataParts.params +
        'lat=' + latLong.lat +
        '&lng=' + latLong.lng;
      return this.http.get<LocationPickerValue[]>(uri);
    } else {
      // should never happen
      throw new TypeError('unsupported dataSource type "' + (typeof dataSource) + '"');
    }
  }

  private analyseDataSource(dataSource: string) {
    let s, p;

    if ((dataSource.indexOf('?') < 0)) {
      s = dataSource;
      p = '?';
    } else {
      const split = dataSource.split('?');
      s = split[0];
      p = '?' + split[1] + '&';
    }

    return {
      uri: s,
      params: p,
    };
  }
}
