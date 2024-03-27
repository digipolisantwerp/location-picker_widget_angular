export interface LocationQueryModel {
  search: string;
  sort: string;
  prioritizelayer: Array<string>;
  pagesize: number;
  layers: Array<string>;
  onlyAntwerp: boolean;
  countries: Array<string>;
  buffer?: number;
}
