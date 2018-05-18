import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LocationPickerValue } from '../../src/location-picker/location-picker.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
      // person in first field
      picker1: LocationPickerValue;

      // person in first field
      picker2: LocationPickerValue = {
        id: '87548',
        name: 'Piep-in-\'t-Riet',
        layer: 'straatnaam',
        street: 'Piep-in-\'t-Riet',
        locationType: 'street',
        coordinates: {
          latLng: {
            lat: 51.347332372152295,
            lng: 4.321095513044615
          },
          lambert: {
            x: 146677.56234668,
            y: 226398.39632439
          }
        }
      };
}
