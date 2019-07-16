import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxLocationPickerHelper} from './ngx-location-picker.helper';
import {LambertModel, LocationModel} from '../types/location.model';
import {AddressQueryModel} from '../types/address-query.model';
import {LocationQueryModel, LocationSortingEnum} from '../types/location-query.model';
import {LayerQueryModel} from '../types/layer-query.model';
import {LayerModel} from '../types/layer.model';
import {AddressIdQueryModel} from '../types/address-id-query.model';
import {CoordinateQueryModel} from '../types/coordinate-query.model';
import {AddressModel} from '../types/address.model';
import {CoordinateModel} from '../types/coordinate.model';

@Injectable({
    providedIn: 'root'
})
export class NgxLocationPickerService {

    private locationPickerApi = '';

    constructor(
        private httpClient: HttpClient,
        private locationPickerHelper: NgxLocationPickerHelper
    ) {
    }

    delegateSearch(query: string, baseUrl: string): Observable<LocationModel[] | AddressModel[] | CoordinateModel[]> {
        this.locationPickerApi = baseUrl;

        if (this.locationPickerHelper.isCoordinate(query)) {
            const coordinate: LambertModel = this.locationPickerHelper.extractXYCoord(query);
            const requestQuery: CoordinateQueryModel = {
                xcoord: coordinate.x,
                ycoord: coordinate.y
            };

            return this.searchLocationsByCoordinates(requestQuery);
        } else if (this.locationPickerHelper.isAddress(query)) {
            const addressQuery: AddressQueryModel = this.locationPickerHelper.extractStreetAndNumber(query);

            return this.searchAddresses(addressQuery);
        } else {
            const locationQuery: LocationQueryModel = {
                layers: ['all'],
                limit: 10,
                search: query,
                sort: LocationSortingEnum.NAME
            };

            return this.searchLocations(locationQuery);
        }
    }

    getMapLayers(query: LayerQueryModel): Observable<LayerModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<LayerModel[]>(`${this.locationPickerApi}/layers`, {params: parameters});
    }

    private searchLocations(query: LocationQueryModel): Observable<LocationModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<LocationModel[]>(`${this.locationPickerApi}/locations`, {params: parameters});
    }

    private searchAddresses(query: AddressQueryModel): Observable<LocationModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<LocationModel[]>(`${this.locationPickerApi}/addresses`, {params: parameters});
    }

    private searchAddressById(query: AddressIdQueryModel): Observable<LocationModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<LocationModel[]>(`${this.locationPickerApi}/addresses/${query.id}`, {params: parameters});
    }

    private searchLocationsByCoordinates(query: CoordinateQueryModel): Observable<CoordinateModel[]> {
        const parameters = this.locationPickerHelper.toHttpParams(query);

        return this.httpClient.get<any>(`${this.locationPickerApi}/coordinates`, {params: parameters});
    }
}
