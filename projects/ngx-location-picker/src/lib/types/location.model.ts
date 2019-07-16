import {LatLngModel} from './address.model';

export interface LocationModel {
    id: string;
    name: string;
    layer: string;
    streetNameId: number;
    streetName: string;
    postCode: number;
    antwerpDistrict: string;
    municipality: string;
    label: string;
    position: {
        lambert72: LambertModel;
        wgs84: LatLngModel;
        geometryMethod: string;
        geometrySpecification: string;
        geometryShape: string;
        geometry: any;
    };
}

export interface LambertModel {
    x: number;
    y: number;
}
