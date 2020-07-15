import { CascadingRulesModel } from './cascading-rules.model';

export interface DelegateSearchModel {
    search: string;
    baseUrl: string;
    limit: number;
    layers: Array<string>;
    prioritizelayer: Array<string>;
    sort: string;
    cascadingReturnSingle: boolean;
    cascadingLimit: number;
    cascadingRules: CascadingRulesModel[];
}