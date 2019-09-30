export interface LeafletTileLayerModel {
  layer: LeafletLayer;
  buttonLabel: string;
}

interface LeafletLayer {
  name: string;
  url: string;
  options?: any;
}

export enum LeafletTileLayerType {
  DEFAULT = 'default',
  CUSTOM = 'custom'
}
