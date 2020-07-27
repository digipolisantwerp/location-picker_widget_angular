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
}
