# NgxLocationPicker

Location Picker for Angular 7+. Provides easy to use interface for searching locations or addresses within the city of Antwerp. For projects that are still using Angular 5, we are [maintaining a v1 branch](https://github.com/digipolisantwerp/location-picker_widget_angular/tree/v1), which will still receive bug fixes if needed.

##### Desktop view

![screenshot](desktop-view.png)

## Using the component

##### Installation

First install the component from npm:

`npm install @acpaas-ui-widgets/ngx-location-picker`

Then import the component inside your module:

```ts
import {LocationPickerModule} from '@acpaas-ui-widgets/ngx-location-picker';

@NgModule({
  imports: [
    ...,
    LocationPickerModule
  ],
  ...
})
```

Finally include the required styles:

Add Antwerp core branding stylesheet in your index.html file:

```html
<link rel="stylesheet" href="https://cdn.antwerpen.be/core_branding_scss/3.2.2/main.min.css">
```

Add required leaflet styles in your angular.json file.

```
"styles": [
    "node_modules/leaflet/dist/leaflet.css",
    "node_modules/leaflet-draw/dist/leaflet.draw.css"
]
```

##### Usage

Note: There are 3 methods of getting values after selecting a location:

**Method 1: locationSelect event**  
```html
<ngx-location-picker
    ...
    (locationSelect)="onLocationSelect($event)"
></ngx-location-picker>
```

**Method 2: NgModel**
```html
<ngx-location-picker
    ...
    [(ngModel)]="selectedLocation"
></ngx-location-picker>
```

**Method 3: Reactive forms**
```html
<ngx-location-picker
    ...
    formControlName="selectedLocation"
></ngx-location-picker>
```

Method 2 and 3 can also be used to set an initial value:

```ts
selectedLocation = {
    label: 'Generaal Armstrongweg 1, 2020 Antwerpen',
    // Not required but can be useful to show a marker on the map.
    position: {
        lat: 0,
        lng: 0
    }
};
```

**Full example**
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
>

<p>This is shown inside the leaflet sidebar if hasSidebar is set to true.</p>

</ngx-location-picker>
```

```ts
class ExampleComponent {

      /* url to the backend-for-frontend (bff) Should function as pass through to the Location Picker API. */
      @Input() baseUrl;
      /* the default zoom level on map load. */
      @Input() defaultZoom = 14;
      /* the zoom level when a location is selected. */
      @Input() onSelectZoom = 16;
      /* the initial map center on load. */
      @Input() mapCenter: Array<number> = [51.215, 4.425];
      /* show a sidebar next to the map leaflet. A sidebar can contain any additional info you like. */
      @Input() hasSidebar = false;
      /* show or hide the map. */
      @Input() showMap = true;
      /**
       * add layers to show on the map. eg: A-card terminals, Velo stations, ...
       * A single featureLayer consists of:
       *
       * url: the url to the mapServer containing the features to be shown on the map.
       * icon: the marker to use to show featureLayer locations.
       *
       * An icon should include: font-awesome icon class, the icon color (default: #0064B) and the icon size (default: 40px)
       * see: FeatureLayerIconModel
       */
      @Input() featureLayers: FeatureLayerModel[] = [];
      /* the input field placeholder text. */
      @Input() placeholder = 'Locaties zoeken...';
      /* label to show above the search field. */
      @Input() label = '';
      /* label to use when no results were found. */
      @Input() noResultsLabel = 'Er werden geen locaties gevonden.';
      /* aria label for clear input button. */
      @Input() clearInputAriaLabel = 'Input veld leegmaken';
      /* custom leaflet tile layer, if provided, shows actions on the leaflet to toggle between default and custom tile layer. */
      @Input() tileLayer: LeafletTileLayerModel;
      /* search input length requirement before triggering a search. */
      @Input() minInputLength = 2;
      /* the amount of results to return */
      @Input() locationsLimit = 5;
      /* the layers to search locations for */
      @Input() locationLayers = ['straatnaam'];
      /* Prioritize a layer, boosts results from a given layer to the top of the found locations. */
      @Input() prioritizeLayer = 'straatnaam';
      /* Sort locations by certain key */
      @Input() sortBy = 'name';
      /* addPolygon event */
      @Output() addPolygon = new EventEmitter<any>();
      /* addLine event */
      @Output() addLine = new EventEmitter<any>();
      /* editFeature event */
      @Output() editFeature = new EventEmitter<any>();
      /* locationSelect event: fired when selecting a location. */
      @Output() locationSelect = new EventEmitter<LocationModel | AddressModel | CoordinateModel>();

}
```

## Demo

Live demo can be found on:
https://locationpicker-app1-o.antwerpen.be

You can also choose to test it locally:

In the root directory run:
```
npm install && ng build ngx-location-picker && ng serve
```

This will install all required dependencies, create an optimized build for the location picker library and sets up a local server at http://localhost:4200.

## Local development

Install required dependencies:
```
npm install
```

Rebuild library on changes
```
npm run dev
```

Start example project
```
ng serve
```

Any changes done on the library will visible on http://localhost:4200


## Build

Run `npm run build-lib` to build the project. The build artifacts will be stored in the `dist/` directory and a .tgz file containing the library will be created. This is needed for publishing to NPM.

## Contributing

We welcome your bug reports and pull requests.

Please see our [contribution guide](CONTRIBUTING.md).

## Publishing

> Only the ACPaaS UI team publishes new packages. [Contact us](https://acpaas-ui.digipolis.be/contact) if you need a new release published.

## Running unit tests

Run `ng test ngx-location-picker` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
