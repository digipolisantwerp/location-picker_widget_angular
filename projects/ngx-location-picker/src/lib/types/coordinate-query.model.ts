export interface CoordinateQueryModel {
    xcoord: number;
    ycoord: number;
    range?: number;
    limit?: number;
    mapservice?: string;
    layerids?: Array<number> | string;
    layerid?: number;
    returngeometry?: boolean;
    relevance?: boolean;
}
