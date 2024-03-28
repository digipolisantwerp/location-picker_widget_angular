import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxLocationPickerHelper } from './ngx-location-picker.helper';
import { LambertModel, LocationModel } from '../types/location.model';
import { AddressQueryModel } from '../types/address-query.model';
import { LocationQueryModel } from '../types/location-query.model';
import { AddressIdQueryModel } from '../types/address-id-query.model';
import { CoordinateQueryModel } from '../types/coordinate-query.model';
import { AddressModel } from '../types/address.model';
import { CoordinateModel, CoordinateSearchResponse } from '../types/coordinate.model';
import { DelegateSearchModel } from '../types/delegate-search.model';
import { PagedResult } from '../types/pagedresult.model'

@Injectable({
  providedIn: 'root'
})

/**
 * NgxLocationPickerService
 * Provide functions for handling location or address searches
 */
export class NgxLocationPickerService {

  private locationPickerApi = '';

  /**
   * NgxLocationPickerService constructor
   *
   * @param httpClient (httpClient used for making requests to the api)
   * @param locationPickerHelper (Helper functions class)
   */
  constructor(
    private httpClient: HttpClient,
    private locationPickerHelper: NgxLocationPickerHelper
  ) {
  }

  /**
   * Main search function. Determines which action to undertake based on the provided search string.
   *
   * @param delegateSearch (the delegateSearch model)
   *
   * @return Observable<LocationModel[] | AddressModel[] | CoordinateModel[]>
   */
  delegateSearch(
    delegateSearch: DelegateSearchModel
  ): Observable<LocationModel[] | AddressModel[] | CoordinateModel[]> {
    delegateSearch.prioritizelayer = delegateSearch.prioritizelayer ? delegateSearch.prioritizelayer : ['straatnaam'];
    this.locationPickerApi = delegateSearch.baseUrl;

    if (this.locationPickerHelper.isCoordinate(delegateSearch.search)) {
      const coordinate: LambertModel = this.locationPickerHelper.extractXYCoord(delegateSearch.search);
      const requestQuery: CoordinateQueryModel = {
        xcoord: coordinate.x,
        ycoord: coordinate.y,
        returnsingle: delegateSearch.cascadingCoordinateReturnSingle,
        totalresults: delegateSearch.cascadingCoordinateLimit,
        cascadingRules: delegateSearch.cascadingCoordinateRules,
        buffer: delegateSearch.bufferSearch,
      };

      return this.searchLocationsByCoordinates(requestQuery);
    } else if (this.locationPickerHelper.isAddress(delegateSearch.search, delegateSearch.locationKeywords)) {
      const addressQuery: AddressQueryModel = this.locationPickerHelper.buildAddressQuery(
        delegateSearch.search,
        delegateSearch.selectedLocation,
        delegateSearch.onlyAntwerp,
        delegateSearch.countryCodes,
        delegateSearch.bufferSearch
      );
      if (delegateSearch.searchStreetNameForAddress) {
        const locationQuery: LocationQueryModel = {
          layers: ['straatnaam'],
          pagesize: delegateSearch.limit,
          search: addressQuery.streetname,
          prioritizelayer: delegateSearch.prioritizelayer,
          sort: delegateSearch.sort,
          onlyAntwerp: delegateSearch.onlyAntwerp,
          countries: delegateSearch.countryCodes,
          buffer: delegateSearch.bufferSearch,
        };

        return this.searchLocations(locationQuery);
      } else {
        return this.searchAddresses(addressQuery);
      }
    } else {
      const locationQuery: LocationQueryModel = {
        layers: delegateSearch.layers,
        pagesize: delegateSearch.limit,
        search: delegateSearch.search,
        prioritizelayer: delegateSearch.prioritizelayer,
        sort: delegateSearch.sort,
        onlyAntwerp: delegateSearch.onlyAntwerp,
        countries: delegateSearch.countryCodes,
        buffer: delegateSearch.bufferSearch,
      };

      return this.searchLocations(locationQuery);
    }
  }

  /**
   * Returns a list of layers present in elastic.
   *
   * @return Observable<LayerModel[]>
   */
  getLayers(): Observable<string[]> {
    return this.httpClient
      .get<PagedResult<'layers', string>>(`${this.locationPickerApi}/layers`)
      .pipe(map((pagedResult: PagedResult<'layers', string>) => pagedResult._embedded.layers));
  }

  /**
   * Search locations by user input
   *
   * @param query (the location to look for)
   *
   * @return Observable<LocationModel[]>
   */
  private searchLocations(query: LocationQueryModel): Observable<LocationModel[]> {
    const parameters = this.locationPickerHelper.toHttpParams(query);

    return this.httpClient
      .get<PagedResult<'locations', LocationModel>>(`${this.locationPickerApi}/locations`, { params: parameters })
      .pipe(map((pagedResult: PagedResult<'locations', LocationModel>) => pagedResult._embedded.locations));
  }

  /**
   * Search addresses based on street name and house number
   *
   * @param query (the address to look for, consists of a street name and house number)
   *
   * @return Observable<AddressModel[]>
   */
  private searchAddresses(query: AddressQueryModel): Observable<AddressModel[]> {
    const parameters = this.locationPickerHelper.toHttpParams(query);

    return this.httpClient
      .get<PagedResult<'addresses', AddressModel>>(`${this.locationPickerApi}/addresses`, { params: parameters })
      .pipe(map((pagedResult: PagedResult<'addresses', AddressModel>) => pagedResult._embedded.addresses));
  }

  /**
   * Get an address by id
   *
   * @param query (the address id to get)
   *
   * @return Observable<AddressModel[]>
   */
  private searchAddressById(query: AddressIdQueryModel): Observable<AddressModel[]> {
    const parameters = this.locationPickerHelper.toHttpParams(query);

    return this.httpClient.get<AddressModel[]>(`${this.locationPickerApi}/addresses/${query.id}`, { params: parameters });
  }

  /**
   * Search locations based on a set of coordinates
   *
   * @param query (search query containing coordinates and other parameters)
   *
   * @return Observable<CoordinateModel[]>
   */
  private searchLocationsByCoordinates(
    query: CoordinateQueryModel
  ): Observable<CoordinateModel[]> {
    return this.httpClient
    .post<CoordinateSearchResponse>(`${this.locationPickerApi}/coordinates/search`,
      query)
      .pipe(map((result: CoordinateSearchResponse) => result.results));
  }
}
