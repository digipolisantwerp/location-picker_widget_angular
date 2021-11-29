export interface LocationQueryModel {
    search: string;
    sort: string;
    prioritizelayer: Array<string>;
    limit: number;
    layers: Array<string>;
    onlyAntwerp?: boolean;
    countries?: Array<string>;
    xcoord?: number;
    ycoord?: number;
    buffer?: number;
}
