export interface CascadingCoordinateRulesModel {
  type?: CascadingCoordinateRulesType;
  addressOptions?: ReverseGeocodeOptionsModel;
  locationOptions?: GeoFeaturesOptionsModel;
}

export enum CascadingCoordinateRulesType {
  LOCATION = 'location',
  ADDRESS = 'address'
}

export interface ReverseGeocodeOptionsModel {
  buffer?: number;
  count?: number;
  relevance?: boolean;
}

export interface GeoFeaturesOptionsModel {
  mapService?: string;
  layerIds?: string;
  returnGeometry?: boolean;
  tolerance?: number;
  buffer?: number;
  count?: number;
}
