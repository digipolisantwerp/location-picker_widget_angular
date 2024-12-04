import { CascadingCoordinateRulesModel } from './cascading-rules.model';

export interface CoordinateQueryModel {
  xcoord: number;
  ycoord: number;
  returnsingle?: boolean;
  totalresults?: number;
  cascadingRules: Array<CascadingCoordinateRulesModel>;
  cascadingGuid: string;
  buffer?: number;
}
