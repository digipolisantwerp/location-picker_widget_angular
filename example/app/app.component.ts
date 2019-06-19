import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocationPickerValue } from '../../src/location-picker/location-picker.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public picker1: LocationPickerValue;

  public picker2: LocationPickerValue = {
    coordinates: {
      latLng: {
        lat: 51.347332372152295,
        lng: 4.321095513044615
      },
    },
  };
}
