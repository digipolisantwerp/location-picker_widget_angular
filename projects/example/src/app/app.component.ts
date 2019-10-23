import {Component, OnInit} from '@angular/core';
import {LeafletTileLayerModel} from '../../../ngx-location-picker/src/lib/types/leaflet-tile-layer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  baseUrl = '';
  selectedLocationModel;

  ngOnInit(): void {
    this.baseUrl = 'http://localhost:3000';
  }

  onSubmitNgModel() {
    console.log('NgModel value:', this.selectedLocationModel);
  }
}
