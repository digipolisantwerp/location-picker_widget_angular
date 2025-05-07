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
      const maliciousCharacters = /[\*\%\;\|\<\>\{\}\[\]\/\\\n\r\?\.]/g;
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
    if (!query || query.trim().length === 0) return false;

    const lowerQuery = query.toLowerCase();

    // Check if it contains a known location keyword explicitly (exclude such cases)
    const lowerLocationKeywords = locationKeywords.map(k => k.toLowerCase());
    if (lowerLocationKeywords.some(keyword => lowerQuery.includes(keyword))) {
      return false;
    }

    // Ensure the query matches: Street name (1 or more words) + house number
    const addressPattern = /^\b([\p{L}'\-]{2,}(?:\s+[\p{L}'\-]{2,})*)\s+(\d+[a-zA-Z]{0,5})(?:,\s*(\d{1,4}|\d{4,5}(?:\s+[\p{L}\s]+)?|[\p{L}\s]+)?)?\s*,?\s*$/iu;

    // Match only if there is at least one street name and a house number
    return addressPattern.test(query);
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
      postcode: "",
      place: "",
      onlyAntwerp: onlyAntwerp,
      countries: countryCodes,
      buffer: buffer,
      xcoord: coordinateSearch?.lat,
      ycoord: coordinateSearch?.lng
    };

    const allParts: Array<string> = query && query.trim().length > 0 ? query.split(",") : null;

    let postcodeAndMunicipalityParts: Array<string> = null;
    let addressParts: Array<string> = null;

    if (allParts){
      addressParts = allParts[0].split(" ");
      if (allParts.length == 2){
        postcodeAndMunicipalityParts = allParts[1].split(" ");
      }
    }

    if (addressParts) {
      let foundHouseNumber = false;

      addressParts.map((part: string, index: number): void => {
        const isNumber = /^[0-9]/.test(part);
        const isHouseNumberPart = /[0-9]\w?$/.test(part);

        // Check if we found the house number
        if (isNumber && !foundHouseNumber) {
          streetAndNumber.housenumber = part;
          foundHouseNumber = true;
        } else if (foundHouseNumber) {
          // Continue building the house number if still adding
          streetAndNumber.housenumber += part;
        } else {
          // Otherwise, treat it as part of the street name
          if (streetAndNumber.streetname) {
            streetAndNumber.streetname += " ";
          }
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

      // Clean up street name
      streetAndNumber.streetname = streetAndNumber.streetname
        .trim()
        .replace(/\s+\([a-z\s\,]+\)$/gi, "");

      // Edge case: Remove numbers mistakenly left in street name
      if (/[a-z]\d*$/.test(streetAndNumber.streetname)) {
        streetAndNumber.streetname = streetAndNumber.streetname.replace(/[0-9]*$/g, "");
      }

      streetAndNumber.housenumber = streetAndNumber.housenumber.trim();

      // The user first chooses a street and can then add a house number. The address is looked up based on the streetnameid and house number.
      // The combination of a street name id and a house number are unique to Antwerp.
      // Including a street name has no added value if the housenumer and streetnameid are known
      if(streetAndNumber.onlyAntwerp && streetAndNumber.streetids.length !== 0 && streetAndNumber.housenumber) streetAndNumber.streetname = null;
    }

    if (postcodeAndMunicipalityParts){
      postcodeAndMunicipalityParts = postcodeAndMunicipalityParts.filter(p => p && p.trim().length > 0);

      postcodeAndMunicipalityParts.forEach((part: string): void => {
        const trimmedPart:string = part.trim();

        if (/^\d{1,4}$/.test(trimmedPart)) {
          streetAndNumber.postcode = trimmedPart;
        }
        else {
          // Assume it's part of the municipality/place name
          if (streetAndNumber.place) {
            streetAndNumber.place += " ";
          }
          streetAndNumber.place += trimmedPart;
        }
      });

      streetAndNumber.place = streetAndNumber.place?.trim();
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
        streetAndNumber.streetname = null;
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
    // eslint-disable-next-line max-len
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
