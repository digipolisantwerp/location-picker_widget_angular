import {Component, OnInit} from '@angular/core';
import {LeafletTileLayerModel} from '../../../ngx-location-picker/src/lib/types/leaflet-tile-layer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;

  satelliteMapLayer: LeafletTileLayerModel = {
    layer: {
      name: 'Satellite View',
      url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    },
    buttonLabel: 'Luchtfoto'
  };

  ngOnInit(): void {
    this.baseUrl = 'https://locationpicker-app1-o.antwerpen.be';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }
}
