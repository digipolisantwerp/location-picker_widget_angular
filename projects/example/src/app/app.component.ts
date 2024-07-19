import { Component, OnInit } from '@angular/core';
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

  satelliteMapLayer: LeafletTileLayerModel = {
    layer: {
      name: 'Satellite View',
      url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_Publiek/Luchtfoto_actueel_wgs84/MapServer/tile/{z}/{y}/{x}',
    },
    buttonLabel: 'Luchtfoto'
  };

  vectorTileLayer = {
    layer: {
      name: "Basemap_antwerpen_met_labels_20220218",
      url: "https://tiles.arcgis.com/tiles/1KSVSmnHT2Lw9ea6/arcgis/rest/services/basemap_antwerpen_met_labels_20220218/VectorTileServer",
    } ,
    buttonLabel: "Basemap Antwerpen (Vector, Custom)"
  };

  cascadingRules: CascadingCoordinateRulesModel[] = [
    {
      type: CascadingCoordinateRulesType.ADDRESS,
      addressOptions: {
        buffer: 50,
        count: 3,
        relevance: false
      }
    } as CascadingCoordinateRulesModel,
    {
      type: CascadingCoordinateRulesType.LOCATION,
      locationOptions: {
        mapService: "https://geoint.antwerpen.be/arcgissql/rest/services/P_DA/Locaties_Cascade/MapServer",
        tolerance: 0,
        returnGeometry: true,
        buffer: 25,
        count: 5,
        layerIds: '26'
      }
    } as CascadingCoordinateRulesModel,
    {
      type: CascadingCoordinateRulesType.LOCATION,
      locationOptions: {
        mapService: "https://geoint.antwerpen.be/arcgissql/rest/services/P_DA/Locaties_Cascade/MapServer",
        buffer: 100,
        tolerance: 0,
        returnGeometry: true,
        count: 3,
        layerIds: '2'
      }
    } as CascadingCoordinateRulesModel,
    {
      type: CascadingCoordinateRulesType.LOCATION,
      locationOptions: {
        mapService: "https://geoint.antwerpen.be/arcgissql/rest/services/P_DA/Locaties_Cascade/MapServer",
        tolerance: 0,
        returnGeometry: true,
        count: 1,
        layerIds: '5'
      }
    } as CascadingCoordinateRulesModel,
    {
      type: CascadingCoordinateRulesType.LOCATION,
      locationOptions: {
        mapService: "https://geoint.antwerpen.be/arcgissql/rest/services/P_DA/Locaties_Cascade/MapServer",
        tolerance: 0,
        returnGeometry: true,
        count: 1,
        layerIds: '0'
      }
    } as CascadingCoordinateRulesModel,
    {
      type: CascadingCoordinateRulesType.LOCATION,
      locationOptions: {
        mapService: "https://geoint.antwerpen.be/arcgissql/rest/services/P_DA/Locaties_Cascade/MapServer",
        tolerance: 0,
        returnGeometry: true,
        count: 1,
        layerIds: '28'
      }
    } as CascadingCoordinateRulesModel
  ]

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


  result: any;
  geoApiBaseUrl = 'https://geoapi-app1-o.antwerpen.be/v2/';

  showLayerManagement = true;
  ngOnInit(): void {
    this.baseUrl = 'https://locationsearchapi-app1-o.antwerpen.be';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }

  updateResult(result: any) {
    this.result = result;
  }
}
