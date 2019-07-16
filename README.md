# NgxLocationPicker

Location Picker for Angular 7+. Provides easy to use interface for searching locations or addresses within the city of Antwerp.

##### Desktop view

![screenshot](desktop-view.png)

##### Mobile view

![screenshot](mobile-view.png)

## Using the component

##### Installation

First install the component from npm:

`npm install @acpaas-ui-widgets/ngx-location-picker`

Then import the component inside your module:

```ts
import {NgxLocationPickerModule} from '@acpaas-ui-widgets/ngx-location-picker';

@NgModule({
  imports: [
    ...,
    NgxLocationPickerModule
  ],
  ...
})
```

Finally include the required styles:

Add Antwerp core branding stylesheet in your index.html file:

```html
<link rel="stylesheet" href="https://cdn.antwerpen.be/core_branding_scss/3.0.3/main.min.css">
```

Add required leaflet styles in the styles array in your angular.json project file.

```
"node_modules/leaflet/dist/leaflet.css"
"node_modules/leaflet-draw/dist/leaflet.draw.css"
```

##### Getting an API key

This component uses a dedicated API for which an api key is required. Request a key through one of the links below (depending on you environment):

Development: https://api-store-o.antwerpen.be  
Acceptance: https://api-store-a.antwerpen.be  
Production: https://api-store.antwerpen.be  

Create a contract with the Location Picker api for your organization.

##### Usage

```html
<ngx-location-picker
    [baseUrl]="baseUrl"
    [defaultZoom]="defaultZoom"
    [onSelectZoom]="onSelectZoom"
    [mapCenter]="mapCenter"
    [hasSidebar]="hasSidebar"
    [showMap]="showMap"
    [featureLayers]="featureLayers"
    [placeholder]="placeholder"
    [label]="label"
    [noResultsLabel]="noResultsLabel"
    (addPolygon)="onAddPolygon($event)"
    (addLine)="onAddLine($event)"
    (editFeature)="onEditFeature($event)"
    (locationSelect)="onLocationSelect($event)"
></ngx-location-picker>
```

```ts
class ExampleComponent {
    
    /**
     * Url to the backend-for-frontend (bff) Should function as pass through to the Location Picker API.
     * Make sure your BFF adds the api key you requested earlier.
     */
    baseUrl: string = 'https://path-to-bff';
    /* the default zoom level on map load. */
    defaultZoom: number = 14;
    /* the zoom level when a location is selected. */
    onSelectZoom: number = 16;
    /* the initial map center on load. */
    mapCenter: Array<number> = [51.215, 4.425];
    /* show a sidebar next to the map leaflet. */
    hasSidebar: boolean = false;
    /* show or hide the map. */
    showMap: boolean = true;
    /* add layers to show on the map. eg: A-card terminals, Velo stations, ... */
    featureLayers: FeatureLayerModel[] = [];
    /* the input field placeholder text. */
    placeholder: string = 'Locaties zoeken...';
    /* label to show above the search field. No label is shown if left empty */
    label: string = '';
    /* label to use when no results were found. */
    noResultsLabel: string = 'Er werden geen locaties gevonden.';
    
    /* addPolygon event */
    onAddPolygon($event: any) {}
    
    /* addLine event */
    onAddLine($event: any) {}
    
    /* editFeature event */
    onEditFeature($event: any) {}
    
    /* locationSelect event: fired when selecting a location. */
    onLocationSelect(location: LocationModel | AddressModel | CoordinateModel) {}
}
```

## Demo

Live demo can be found on:
https://locationpicker-app1-o.antwerpen.be

## Build

Run `ng build ngx-location-picker` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-location-picker`, go to the dist folder `cd dist/ngx-location-picker` and run `npm publish`.

## Running unit tests

Run `ng test ngx-location-picker` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
