import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { LambertModel, LocationModel } from "../types/location.model";
import { AddressQueryModel } from "../types/address-query.model";
import proj4 from "proj4";
import {AddressModel, LatLngModel} from "../types/address.model";
import { CoordinateModel } from "../types/coordinate.model";

@Injectable({
  providedIn: "root",
})

/**
 * NgxLocationPickerHelper
 * Provide helper functions
 */
export class NgxLocationPickerHelper {
  /**
   * NgxLocationPickerHelper constructor
   */
  constructor() {}

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
    Object.keys(strQuery).forEach((key) => {
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
    Object.keys(obj).forEach((key) => {
      const queryValue = obj[key];
      if (typeof queryValue === "string") {
        retObj[key] = queryValue;
      } else if (Array.isArray(queryValue) && queryValue.length > 0) {
        const strArr: string[] = [];
        for (const [index, value] of queryValue.entries()) {
          strArr.push(queryValue[index].toString());
        }
        retObj[key] = strArr;
      } else {
        retObj[key] =
          queryValue !== null && queryValue !== undefined
            ? queryValue.toString()
            : "";
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
      // Remove malicious characters
      const maliciousCharacters = /[\*\%\;\|\<\>\{\}\[\]\/\\\n\r\?\.\--]/g;
      value = value.replace(maliciousCharacters, "");

      const hasBrackets = value.match(/\(.*?\)/);
      if (hasBrackets && hasBrackets.length) return value.replace(` ${hasBrackets}`, "");
    }
    return value;
  }

  /**
   * Determines if the given query input resembles an address or not.
   *
   * @return boolean
   */
  isAddress(query: string, locationKeywords: string[]): boolean {
    const addressParts: Array<string> | null = query ? query.split(" ") : null;

    const lowerLocationKeyWords = locationKeywords.map((x) => x.toLowerCase());

    if (
      addressParts &&
      Array.isArray(addressParts) &&
      addressParts.length > 1
    ) {
      for (const [index, value] of addressParts.entries()) {
        // exclusion for specific search combinations (ex 'kaainummer + number' GIS-537)
        if (lowerLocationKeyWords.includes(addressParts[index].toLowerCase())) {
          return false;
        }

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
    const coordinateParts: Array<string> | null =
      query && query.trim().length > 0 ? query.split(",") : null;

    if (coordinateParts.length === 2) {
      if (
        !isNaN(Number(coordinateParts[0])) &&
        !isNaN(Number(coordinateParts[1]))
      ) {
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
    return "streetName" in object;
  }

  /**
   * Determines if the given query input resembles alternative coordinate pairs ex: 51,205729 4,388629
   *
   * @return boolean
   */
  isAlternativeCoordinateNotation(query: string): boolean {
    const coordinateParts: Array<string> | null =
      query && query.trim().length > 0 ? query.split(" ") : null;

    if (coordinateParts.length === 2) {
      if (
        !isNaN(Number(coordinateParts[0].replace(",", "."))) &&
        !isNaN(Number(coordinateParts[1].replace(",", ".")))
      ) {
        return true;
      }
    }

    return false;
  }

  convertAlternativeCoordinateToNormalNotation(query: string): string {
    const commaChar = /\,/gi;
    const spaceChar = / /gi;

    return query.replace(commaChar, ".").replace(spaceChar, ",");
  }

  /**
   * Splits the location query in street name and house number and checks for streetnameid.
   *
   * @return streetAndNumber
   */
  buildAddressQuery(
    query: string,
    selectedLocation: LocationModel | AddressModel | CoordinateModel,
    onlyAntwerp: boolean,
    countryCodes: string[],
    buffer?: number,
    coordinateSearch?: LatLngModel,
    streetIds?: number[],
  ): AddressQueryModel {
    const streetAndNumber: AddressQueryModel = {
      streetname: "",
      streetids: streetIds ?? [],
      housenumber: "",
      onlyAntwerp: onlyAntwerp,
      countries: countryCodes,
      buffer: buffer,
      xcoord: coordinateSearch?.lat,
      ycoord: coordinateSearch?.lng
    };

    const addressParts: Array<string> =
      query && query.trim().length > 0 ? query.split(" ") : null;

    if (addressParts) {
      addressParts.map((part, index) => {
        const matches = /[0-9]\w?$/.exec(part);

        if (index > 0 && matches) {
          if (!!streetAndNumber.housenumber || matches.index === 0) {
            streetAndNumber.housenumber += part + "";
            return;
          }
        }

        if (streetAndNumber.streetname) {
          streetAndNumber.streetname += " ";
        }

        if (/\d$/.test(part) && index + 1 === addressParts.length) {
          streetAndNumber.housenumber = part.replace(/^[0-9]\-[a-z]+/g, "");
          streetAndNumber.streetname += part.replace(/\d*$/, "");
        } else if (/[0-9]\w?$/.exec(streetAndNumber.housenumber + part)) {
          streetAndNumber.housenumber += part;
        } else {
          streetAndNumber.streetname += part;
        }
      });

      streetAndNumber.streetname = streetAndNumber.streetname
        .trim()
        .replace(/\s+\([a-z\s\,]+\)$/gi, "");

      if (/[a-z]\d*$/.test(streetAndNumber.streetname)) {
        streetAndNumber.streetname = streetAndNumber.streetname.replace(
          /[0-9]*$/g,
          ""
        );
      }

      streetAndNumber.housenumber = query
        .replace(streetAndNumber.streetname, "")
        .replace(/\s/g, "");
      streetAndNumber.housenumber = streetAndNumber.housenumber
        .trim()
        .replace(/^\([a-z\s\,]*\)/gi, "");
    }

    // if previous selected location is of type LocationModel and location has streetid
    //  ==> check if name corresponds with the streetname to use the streetnameid
    if (
      selectedLocation &&
      this.isLocationModel(selectedLocation) &&
      selectedLocation.streetNameId
    ) {
      if (
        selectedLocation.streetName.toUpperCase() ===
        streetAndNumber.streetname.toUpperCase()
      ) {
        streetAndNumber.streetname = "";
        streetAndNumber.streetids.push(selectedLocation.streetNameId);
      }
    }

    return streetAndNumber;
  }

  /**
   * Splits the location query in X/Y coordinate.
   *
   * @return coordinate
   */
  extractXYCoord(query: string): LambertModel {
    const coordinateParts: Array<string> | null =
      query && query.trim().length > 0 ? query.split(",") : null;
    const coordinate: LambertModel = {
      x: Number(coordinateParts[0]),
      y: Number(coordinateParts[1]),
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
  convertLambertToWgs84Coordinates(
    lambertCoordinate: LambertModel
  ): LambertModel {
    // tslint:disable-next-line: max-line-length
    const lambertProj =
      "+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs";
    const result = proj4(lambertProj, "WGS84", [
      lambertCoordinate.x,
      lambertCoordinate.y,
    ]);
    const coordinates: LambertModel = {
      x:
        result[0] >= this.minX && result[0] <= this.maxX
          ? result[0]
          : result[1] >= this.minX && result[1] <= this.maxX
          ? result[1]
          : 0,
      y:
        result[0] >= this.minY && result[0] <= this.maxY
          ? result[0]
          : result[1] >= this.minY && result[1] <= this.maxY
          ? result[1]
          : 0,
    };
    return coordinates;
  }
}
