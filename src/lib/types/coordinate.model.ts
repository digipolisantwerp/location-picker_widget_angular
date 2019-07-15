import {LocationModel} from './location.model';
import {AddressModel} from './address.model';

export interface CoordinateModel {
    label: string;
    location: LocationModel;
    address: AddressModel;
}
