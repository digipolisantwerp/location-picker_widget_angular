import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxLocationPickerHelper} from './ngx-location-picker.helper';
import {LambertModel, LocationModel} from '../types/location.model';
import {AddressQueryModel} from '../types/address-query.model';
import {LocationQueryModel} from '../types/location-query.model';
import {LayerQueryModel} from '../types/layer-query.model';
import {LayerModel} from '../types/layer.model';
import {AddressIdQueryModel} from '../types/address-id-query.model';
import {CoordinateQueryModel} from '../types/coordinate-query.model';
import {AddressModel} from '../types/address.model';
import {CoordinateModel} from '../types/coordinate.model';

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
     * @param search (the search query)
     * @param baseUrl (required the url to the BFF)
     * @param limit (the amount of locations to return, only used for querying searchLocations)
     * @param layers (the layers to look for locations in, only used for querying searchLocations)
     * @param prioritizelayer (the layer to boost)
     * @param sort (key to sort results by)
     *
     * @return Observable<LocationModel[] | AddressModel[] | CoordinateModel[]>
     */
    delegateSearch(
      search: string,
      baseUrl: string,
      limit: number = 5,
      layers: Array<string> = ['straatnaam'],
      prioritizelayer: Array<string> = ['straatnaam'],
      sort: string = 'name'
    ): Observable<LocationModel[] | AddressModel[] | CoordinateModel[]> {
        this.locationPickerApi = baseUrl;

        if (this.locationPickerHelper.isCoordinate(search)) {
            const coordinate: LambertModel = this.locationPickerHelper.extractXYCoord(search);
            const requestQuery: CoordinateQueryModel = {
                xcoord: coordinate.x,
                ycoord: coordinate.y,
                limit
            };

            return this.searchLocationsByCoordinates(requestQuery);
        } else if (this.locationPickerHelper.isAddress(search)) {
            const addressQuery: AddressQueryModel = this.locationPickerHelper.extractStreetAndNumber(search);

            return this.searchAddresses(addressQuery);
        } else {
            const locationQuery: LocationQueryModel = {
                layers,
                limit,
                search,
                prioritizelayer,
                sort
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

        return this.httpClient.get<LayerModel[]>(`${this.locationPickerApi}/layers`, {params: parameters});
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

        return this.httpClient.get<LocationModel[]>(`${this.locationPickerApi}/locations`, {params: parameters});
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

        return this.httpClient.get<AddressModel[]>(`${this.locationPickerApi}/addresses`, {params: parameters});
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

        return this.httpClient.get<AddressModel[]>(`${this.locationPickerApi}/addresses/${query.id}`, {params: parameters});
    }

    /**
     * Search locations based on a set of coordinates
     *
     * @param query (search query containing coordinates and other parameters)
     *
     * @return Observable<CoordinateModel[]>
     */
    private searchLocationsByCoordinates(query: CoordinateQueryModel): Observable<CoordinateModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<any>(`${this.locationPickerApi}/coordinates`, {params: parameters});
    }
}
