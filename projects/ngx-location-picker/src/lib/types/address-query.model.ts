export interface AddressQueryModel {
    streetname: string;
    streetids: number[];
    housenumber: string;
    postalcode?: string;
    place?: string;
    onlyAntwerp?: boolean;
    countries?: string[];
}
