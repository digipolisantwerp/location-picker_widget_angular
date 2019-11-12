import {LocationModel} from './location.model';
import {AddressModel, LatLngModel} from './address.model';

export interface CoordinateModel {
    label?: string;
    location?: LocationModel;
    address?: AddressModel;
    actualLocation?: LatLngModel;
}
