export interface CascadingRulesModel {
  type?: CascadingRulesType;
  mapService?: string;
  layerId?: number;
  layerIds?: Array<number>;
  buffer?: number;
  tolerance?: number;
  returnGeometry?: boolean;
  relevance?: boolean;
  limit?: number;
}

export enum CascadingRulesType {
  POINTWITHIN = 'pointWithin',
  POINTNEARBY = 'pointNearby',
  REVERSEGEOCODE = 'reverseGeocode'
}
