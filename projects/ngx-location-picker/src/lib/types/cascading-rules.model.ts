export interface CascadingRulesModel {
  type?: CascadingRulesType;
  addressOptions?: ReverseGeocodeOptionsModel;
  locationOptions?: GeoFeaturesOptionsModel;
}

export enum CascadingRulesType {
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
