import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {LambertModel, LocationModel} from '../types/location.model';
import {AddressQueryModel} from '../types/address-query.model';
import {CascadingCoordinateRulesModel, CascadingCoordinateRulesType} from '../types/cascading-rules.model';
import proj4 from 'proj4';
import { AddressModel, LatLngModel } from '../types/address.model';
import { CoordinateModel } from '../types/coordinate.model';

@Injectable({
  providedIn: 'root'
})

/**
 * NgxLocationPickerHelper
 * Provide helper functions
 */
export class NgxLocationPickerHelper {

  /**
   * NgxLocationPickerHelper constructor
   */
  constructor() {
  }

  // These coordinates respresents border of Belgium
  minX = 49.4;
  maxX = 51.6;
  minY = 2.3;
  maxY = 6.45;

  /**
   * Converts a query object to HttpParams.
   *
   * @param query (the object containing a set of parameters)
   *
   * @return HttpParams
   */
  toHttpParams(query: any): HttpParams {
    const strQuery = this.queryObjectToStringObject(query);
    let params = new HttpParams();
    Object.keys(strQuery).forEach(key => {
      if (strQuery[key]) {
        params = params.set(key, strQuery[key]);
      }
    });
    return params;
  }

  /**
   * Converts a query object to a query string
   *
   * @param obj (the object containing a set of parameters)
   *
   * @return any
   */
  private queryObjectToStringObject(obj: any): any {
    const retObj = {};
    Object.keys(obj).forEach(key => {
      const queryValue = obj[key];
      if (typeof queryValue === 'string') {
        retObj[key] = queryValue;
      } else if (Array.isArray(queryValue) && queryValue.length > 0) {
        const strArr: string[] = [];
        for (const [index, value] of queryValue.entries()) {
          strArr.push((queryValue[index].toString()));
        }
        retObj[key] = strArr;
      } else {
        retObj[key] = (queryValue !== null && queryValue !== undefined) ? queryValue.toString() : '';
      }
    });
    return retObj;
  }

  /**
   * Normalize search value
   *
   * @return string
   */
  normalizeSearchValue(value: string) {
    if (!this.isCoordinate(value)) {
      const hasBrackets = value.match(/\(.*?\)/);

      if (hasBrackets && hasBrackets.length) {
        return value.replace(` ${hasBrackets}`, '');
      } else {
        const hasComma = value.indexOf(',');

        //TODO check why comma's where filtered out of result
        // if (hasComma > -1) {
        //   return value.replace(value.substr(hasComma, value.length), '');
        // }
      }
    }

    return value;
  }

  /**
   * Determines if the given query input resembles an address or not.
   *
   * @return boolean
   */
  isAddress(query: string): boolean {

    const queryParts: Array<string> | null = (query) ? query.split(','): null;
    const addressParts: Array<string> | null = (queryParts && queryParts[0]) ? queryParts[0].split(' ') : null;

    if (addressParts && Array.isArray(addressParts) && addressParts.length > 1) {
      for (const [index, value] of addressParts.entries()) {
        const matches = /[0-9]\w?$/.exec(addressParts[index]);

        if (matches) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Determines if the given query input resembles coordinate pairs
   *
   * @return boolean
   */
  isCoordinate(query: string): boolean {
    const coordinateParts: Array<string> | null = (query && query.trim().length > 0) ? query.split(',') : null;

    if (coordinateParts.length === 2) {
      if (!isNaN(Number(coordinateParts[0])) && !isNaN(Number(coordinateParts[1]))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines if the given object matches LocationModel interface
   *
   *
   */
 isLocationModel(object: any): object is LocationModel {
   return 'streetName' in object;
 }

  /**
   * Determines if the given query input resembles alternative coordinate pairs ex: 51,205729 4,388629
   *
   * @return boolean
   */
  isAlternativeCoordinateNotation(query: string): boolean {
    const coordinateParts: Array<string> | null = (query && query.trim().length > 0) ? query.split(' ') : null;

    if (coordinateParts.length === 2) {
      if (!isNaN(Number(coordinateParts[0].replace(',', '.'))) && !isNaN(Number(coordinateParts[1].replace(',', '.')))) {
        return true;
      }
    }

    return false;
  }

  convertAlternativeCoordinateToNormalNotation(query: string): string {
    const commaChar = /\,/gi;
    const spaceChar = / /gi;

    return query.replace(commaChar, '.').replace(spaceChar, ',');
  }

  /**
   * Splits the location query in street name and house number and checks for streetnameid.
   *
   * @return addressQuery
   */
  buildAddressQuery(query: string, selectedLocation: LocationModel | AddressModel | CoordinateModel, searchInAntwerp: boolean, countryCodes: string[], startCoordinate?: LatLngModel, buffer?: number): AddressQueryModel {
    const addressQuery: AddressQueryModel = {
      streetname: '',
      streetids: [],
      housenumber: '',
      onlyAntwerp: searchInAntwerp,
      countries: !searchInAntwerp ? countryCodes : [],
      xcoord: startCoordinate ? startCoordinate.lat : null,
      ycoord: startCoordinate ? startCoordinate.lng : null,
      buffer: buffer
    };

    const queryParts: Array<string> = (query && query.trim().length > 0) ? query.split(',') : null;
    const addressParts: Array<string> = (queryParts && queryParts[0]) ? queryParts[0].split(' ') : null;
    const placeParts: Array<string> = (queryParts && queryParts[1]) ? queryParts[1].split(' ') : null;

    if (addressParts) {
      addressParts.map((part, index) => {
        const matches = /[0-9]\w?$/.exec(part);

        if ((index > 0) && matches) {
          if (!!addressQuery.housenumber || matches.index === 0) {
            addressQuery.housenumber += part + '';
            return;
          }
        }

        if (addressQuery.streetname) {
          addressQuery.streetname += ' ';
        }

        if (/\d$/.test(part) && ((index + 1) === addressParts.length)) {
          addressQuery.housenumber = part.replace(/^[0-9]\-[a-z]+/g, '');
          addressQuery.streetname += part.replace(/\d*$/, '');
        }  else if (/[0-9]\w?$/.exec(addressQuery.housenumber + part)) {
          addressQuery.housenumber += part;
        } else {
          addressQuery.streetname += part;
        }
      });

      addressQuery.streetname = addressQuery.streetname.trim().replace(/\s+\([a-z\s\,]+\)$/gi, '');

      if (/[a-z]\d*$/.test(addressQuery.streetname)) {
        addressQuery.streetname = addressQuery.streetname.replace(/[0-9]*$/g, '');
      }

      //TODO: check why this line was usefull??? 0 documentation, 0 documentation, great thanks
      addressQuery.housenumber = addressParts.join(' ').replace(addressQuery.streetname, '').replace(/\s/g, '');
      addressQuery.housenumber = addressQuery.housenumber.trim().replace(/^\([a-z\s\,]*\)/gi, '');
    }

    if (placeParts) {
      placeParts.map((placePart: string) => {
        //early implementation if placepart is number than that's the postalcode, TODO FIX to search for postalcodes of the netherlands can be a combination of numbers and letters
        
        //this checks for '43', '43A'
        const matches = /[0-9]\w?$/.exec(placePart);
        if (matches) {
          addressQuery.postalcode = placePart;
        } else {
          addressQuery.place = placePart;
        }
      })
    }

    // if previous selected location is of type LocationModel and location has streetid
    //  ==> check if name corresponds with the streetname to use the streetnameid
    if (selectedLocation && this.isLocationModel(selectedLocation) && selectedLocation.streetNameId) {
      if (selectedLocation.streetName.toUpperCase()
      === addressQuery.streetname.toUpperCase()) {
        addressQuery.streetname = '';
        addressQuery.streetids.push(selectedLocation.streetNameId);
      }
    }


    return addressQuery;
  }

  /**
   * Splits the location query in X/Y coordinate.
   *
   * @return coordinate
   */
  extractXYCoord(query: string): LambertModel {
    const coordinateParts: Array<string> | null = (query && query.trim().length > 0) ? query.split(',') : null;
    const coordinate: LambertModel = {
      x: Number(coordinateParts[0]),
      y: Number(coordinateParts[1])
    };

    return coordinate;
  }

  /**
   * Checks wether given coordinates are WGS84 (response true) or Lambert (response false)
   *
   * @param x given x coordinate
   * @param y given y coordinate
   *
   * @return isWgs84
   */
  isWgs84Coordinates(x?: number, y?: number): boolean {
    if (x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY) {
      return true;
    }
    return false;
  }

  /**
   * Converts lambertcoordinates to wgs84 coordinate
   *
   * @param lambertCoordinate lambertmodel coordinates
   *
   * @return wgs84coordinates
   */
  convertLambertToWgs84Coordinates(lambertCoordinate: LambertModel): LambertModel {
    // tslint:disable-next-line: max-line-length
    const lambertProj = '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs';
    const result =  proj4(lambertProj, 'WGS84', [lambertCoordinate.x, lambertCoordinate.y]);
    const coordinates: LambertModel = {
      x: result[0] >= this.minX && result[0] <= this.maxX ? result[0] : result[1] >= this.minX && result[1] <= this.maxX ? result[1] : 0,
      y: result[0] >= this.minY && result[0] <= this.maxY ? result[0] : result[1] >= this.minY && result[1] <= this.maxY ? result[1] : 0
    };
    return coordinates;
  }

}
