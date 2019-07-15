export interface LocationQueryModel {
    search: string;
    sort: LocationSortingEnum;
    limit: number;
    layers: Array<string>;
}

export enum LocationSortingEnum {
    LAYER = 'layer',
    NAME = 'name'
}
