import { AddressModel } from '../../lib/types/address.model';
import { CoordinateModel } from '../../lib/types/coordinate.model';
import { LocationModel } from '../../lib/types/location.model';
import { CascadingCoordinateRulesModel } from './cascading-rules.model';

export interface DelegateSearchModel {
  search: string;
  baseUrl: string;
  limit: number;
  layers: Array<string>;
  prioritizelayer: Array<string>;
  sort: string;
  cascadingCoordinateReturnSingle: boolean;
  cascadingCoordinateLimit: number;
  cascadingCoordinateRules: CascadingCoordinateRulesModel[];
  selectedLocation: LocationModel | AddressModel | CoordinateModel;
  locationKeywords: string[];
  searchStreetNameForAddress: boolean;
  onlyAntwerp: boolean;
  countryCodes: string[];
}
