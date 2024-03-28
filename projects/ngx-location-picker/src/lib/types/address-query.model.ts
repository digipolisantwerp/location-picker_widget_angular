export interface AddressQueryModel {
  streetname: string;
  streetids: number[];
  housenumber: string;
  onlyAntwerp: boolean;
  countries: string[];
  buffer? :number;
}
