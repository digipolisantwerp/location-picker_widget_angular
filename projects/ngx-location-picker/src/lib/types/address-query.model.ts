export interface AddressQueryModel {
  streetname: string;
  streetids: number[];
  housenumber: string;
  postcode: string;
  place: string;
  onlyAntwerp: boolean;
  countries: string[];
  buffer?: number;
  xcoord?: number;
  ycoord?: number;
}
