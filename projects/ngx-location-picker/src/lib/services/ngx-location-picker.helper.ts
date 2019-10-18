import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {LambertModel} from '../types/location.model';
import {AddressQueryModel} from '../types/address-query.model';
import {CascadingRulesModel, CascadingRulesType} from '../types/cascading-rules.model';

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
      } else if (Array.isArray(queryValue)) {
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

        if (hasComma > -1) {
          return value.replace(value.substr(hasComma, value.length), '');
        }
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
    const addressParts: Array<string> | null = (query) ? query.split(' ') : null;

    if (addressParts && Array.isArray(addressParts) && addressParts.length > 1) {
      for (const [index, value] of addressParts.entries()) {
        const matches = /[0-9]$/.exec(addressParts[index]);

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
   * Splits the location query in street name and house number.
   *
   * @return streetAndNumber
   */
  extractStreetAndNumber(query: string): AddressQueryModel {
    const streetAndNumber: AddressQueryModel = {
      streetname: '',
      housenumber: ''
    };

    const addressParts: Array<string> = (query && query.trim().length > 0) ? query.split(' ') : null;

    if (addressParts) {
      addressParts.map((part, index) => {
        const matches = /[0-9]$/.exec(part);

        if ((index > 0) && matches) {
          if (!!streetAndNumber.housenumber || matches.index === 0) {
            streetAndNumber.housenumber += part + '';
            return;
          }
        }

        if (streetAndNumber.streetname) {
          streetAndNumber.streetname += ' ';
        }

        if (/\d$/.test(part) && ((index + 1) === addressParts.length)) {
          streetAndNumber.housenumber = part.replace(/^[0-9]\-[a-z]+/g, '');
          streetAndNumber.streetname += part.replace(/\d*$/, '');
        } else {
          streetAndNumber.streetname += part;
        }
      });

      streetAndNumber.streetname = streetAndNumber.streetname.trim().replace(/\s+\([a-z\s\,]+\)$/gi, '');

      if (/[a-z]\d*$/.test(streetAndNumber.streetname)) {
        streetAndNumber.streetname = streetAndNumber.streetname.replace(/[0-9]*$/g, '');
      }

      streetAndNumber.housenumber = query.replace(streetAndNumber.streetname, '').replace(/\s/g, '');
      streetAndNumber.housenumber = streetAndNumber.housenumber.trim().replace(/^\([a-z\s\,]*\)/gi, '');
    }

    return streetAndNumber;
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
   * Returns the default cascading configuration.
   *
   * @return cascadingRules
   */
  getDefaultCascadingConfig(): Array<CascadingRulesModel> {
    return [
      {
        type: CascadingRulesType.POINTWITHIN,
        mapService: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Meldingen/meldingen/MapServer',
        tolerance: 0,
        returnGeometry: true,
        layerIds: [6]
      },
      {
        type: CascadingRulesType.REVERSEGEOCODE,
        buffer: 25,
        limit: 5,
        relevance: true
      },
      {
        type: CascadingRulesType.POINTNEARBY,
        mapService: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Meldingen/meldingen/MapServer',
        buffer: 20,
        returnGeometry: true,
        layerId: 9
      },
      {
        type: CascadingRulesType.REVERSEGEOCODE,
        buffer: 100,
        limit: 5,
        relevance: true
      },
      {
        type: CascadingRulesType.POINTNEARBY,
        mapService: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Meldingen/meldingen/MapServer',
        buffer: 100,
        returnGeometry: true,
        layerId: 2
      }
    ];
  }

}
