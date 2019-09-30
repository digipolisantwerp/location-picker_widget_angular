import {LambertModel} from './location.model';

export interface AddressModel {
    id?: number;
    addressRegId?: number;
    crabAddressId?: number;
    crabAddressType?: CrabAddressType;
    formattedAddress?: string;
    label?: string;
    municipalityPost?: {
        nisCode?: string;
        municipality?: string;
        antwerpDistrict?: string;
        antwerpDistrictCode?: string;
        postCode?: number;
    };
    street?: {
        streetNameId?: number;
        streetName?: string;
        homonymAddition?: string;
    };
    houseNumber?: {
        houseNumber?: string;
        busNumber?: string;
    };
    addressPosition?: {
        lambert72?: LambertModel;
        wgs84?: LatLngModel;
        geometryMethod?: string;
    };
    distance?: number;
}

enum CrabAddressType {
    SUB = 'subadres',
    MAIN = 'hoofdadres'
}

export interface LatLngModel {
    lat?: number;
    lng?: number;
}
