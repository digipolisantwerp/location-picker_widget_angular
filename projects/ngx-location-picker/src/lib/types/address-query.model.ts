import { LatLngModel } from './address.model';

export interface AddressQueryModel {
    streetname: string;
    streetids: number[];
    housenumber: string;
    postalcode?: string;
    place?: string;
    onlyAntwerp?: boolean;
    countries?: string[];
    //if provided filter results in start coordinate with buffer in kilometers as radius
    xcoord?: number;
    ycoord?: number;
    buffer?: number;
}
