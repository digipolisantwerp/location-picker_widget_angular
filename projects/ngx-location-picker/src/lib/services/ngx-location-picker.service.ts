import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxLocationPickerHelper } from './ngx-location-picker.helper';
import { LambertModel, LocationModel } from '../types/location.model';
import { AddressQueryModel } from '../types/address-query.model';
import { LocationQueryModel } from '../types/location-query.model';
import { LayerQueryModel } from '../types/layer-query.model';
import { LayerModel } from '../types/layer.model';
import { AddressIdQueryModel } from '../types/address-id-query.model';
import { CoordinateQueryModel } from '../types/coordinate-query.model';
import { AddressModel } from '../types/address.model';
import { CoordinateModel } from '../types/coordinate.model';
import { CascadingCoordinateRulesModel } from '../types/cascading-rules.model';
import { DelegateSearchModel } from '../types/delegate-search.model';

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
        totalresults: delegateSearch.cascadingCoordinateLimit
      };

      return this.searchLocationsByCoordinates(requestQuery, delegateSearch.cascadingCoordinateRules);
    } else if (this.locationPickerHelper.isAddress(delegateSearch.search, delegateSearch.locationKeywords)) {
      const addressQuery: AddressQueryModel = this.locationPickerHelper.buildAddressQuery(
        delegateSearch.search,
        delegateSearch.selectedLocation
      );

      return this.searchAddresses(addressQuery);
    } else {
      const locationQuery: LocationQueryModel = {
        layers: delegateSearch.layers,
        limit: delegateSearch.limit,
        search: delegateSearch.search,
        prioritizelayer: delegateSearch.prioritizelayer,
        sort: delegateSearch.sort
      };

      return this.searchLocations(locationQuery);
    }
  }

  /**
   * Returns a list of layers based on the provided map service.
   *
   * @param query (the map service to load layers from)
   *
   * @return Observable<LayerModel[]>
   */
  getMapLayers(query: LayerQueryModel): Observable<LayerModel[]> {
    const parameters = this.locationPickerHelper.toHttpParams(query);

    return this.httpClient.get<LayerModel[]>(`${this.locationPickerApi}/layers`, { params: parameters });
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

    return this.httpClient.get<LocationModel[]>(`${this.locationPickerApi}/locations`, { params: parameters });
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

    return this.httpClient.get<AddressModel[]>(`${this.locationPickerApi}/addresses`, { params: parameters });
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
    query: CoordinateQueryModel,
    cascadingCoordinateRules: Array<CascadingCoordinateRulesModel>
  ): Observable<CoordinateModel[]> {
    const parameters = this.locationPickerHelper.toHttpParams(query);

    return this.httpClient.post<CoordinateModel[]>(`${this.locationPickerApi}/coordinates`,
      cascadingCoordinateRules, { params: parameters });
  }
}
