export interface LocationQueryModel {
  search: string;
  sort: string;
  prioritizelayer: Array<string>;
  limit: number;
  layers: Array<string>;
}
