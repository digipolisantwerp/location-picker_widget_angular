import {Component, OnInit} from '@angular/core';
import { FilterLayerOptions, GeofeatureDetail, OperationalLayerOptions, SupportingLayerOptions } from '@acpaas-ui-widgets/ngx-location-viewer';
import { CascadingCoordinateRulesModel, CascadingCoordinateRulesType } from 'projects/ngx-location-picker/src/lib/types/cascading-rules.model';
import { LeafletTileLayerModel } from 'projects/ngx-location-picker/src/lib/types/leaflet-tile-layer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;
  hasSideBar = false;

  cascadingRules: CascadingCoordinateRulesModel[] = [{
    type: CascadingCoordinateRulesType.LOCATION,
                locationOptions: {
                    mapService: 'https://geoint-a.antwerpen.be/arcgissql/rest/services/A_DA/Locaties_Cascade/MapServer',
                    tolerance: 1,
                    returnGeometry: true,
                    count: 5,
                    layerIds: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24',
                }
  }];

  supportingLayerOptions: SupportingLayerOptions = {
    url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
    layerIds: [143, 144, 145, 146, 147],
};

operationalLayerOptions: OperationalLayerOptions = {
    url: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Stad/Mobiliteit/Mapserver',
    layerId: 2,
    enableClustering: true,
};

filterLayers: FilterLayerOptions[] = [{
    url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
    name: 'Routenaam',
    layerId: 78,
    popupLabel: 'Routenaam',
    propertyToDisplay: 'Routenaam',
}];


  result: GeofeatureDetail[];
  geoApiBaseUrl = 'https://geoapi-app1-o.antwerpen.be/v2/';

  showLayerManagement = true;
  ngOnInit(): void {
    this.baseUrl = 'https://locationpicker-app1-o.antwerpen.be';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }

  onFilteredResult(result: any) {
    this.result = result;
  }
}
