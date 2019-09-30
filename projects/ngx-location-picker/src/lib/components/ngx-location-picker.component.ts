import {Component, EventEmitter, forwardRef, HostListener, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {baseMapAntwerp, baseMapWorldGray, LeafletMap} from '@acpaas-ui/ngx-components/map';
import {NgxLocationPickerService} from '../services/ngx-location-picker.service';
import {FeatureLayerModel} from '../types/feature-layer.model';
import {LambertModel, LocationModel} from '../types/location.model';
import {AddressModel} from '../types/address.model';
import {CoordinateModel} from '../types/coordinate.model';
import {NotificationModel} from '../types/notification.model';
import {NgxLocationPickerHelper} from '../services/ngx-location-picker.helper';
import {LeafletTileLayerModel, LeafletTileLayerType} from '../types/leaflet-tile-layer.model';

@Component({
  selector: 'aui-location-picker',
  templateUrl: './ngx-location-picker.component.html',
  styleUrls: ['./ngx-location-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxLocationPickerComponent),
      multi: true
    }
  ]
})
export class NgxLocationPickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  /* Url to the backend-for-frontend (bff) Should function as pass through to the Location Picker API. */
  @Input() baseUrl;
  /* The default zoom level on map load. */
  @Input() defaultZoom = 14;
  /* The zoom level when a location is selected. */
  @Input() onSelectZoom = 16;
  /* The initial map center on load. */
  @Input() mapCenter: Array<number> = [51.215, 4.425];
  /* Show a sidebar next to the map leaflet. A sidebar can contain any additional info you like. */
  @Input() hasSidebar = false;
  /* Show or hide the map. */
  @Input() showMap = true;
  /* Toggle the clear button */
  @Input() showClearInputButton = true;
  /**
   * Add layers to show on the map. eg: A-card terminals, Velo stations, ...
   * A single featureLayer consists of:
   *
   * url: the url to the mapServer containing the features to be shown on the map.
   * icon: the marker to use to show featureLayer locations.
   *
   * An icon should include: font-awesome icon class, the icon color (default: #0064B) and the icon size (default: 40px)
   * see: FeatureLayerIconModel
   */
  @Input() featureLayers: FeatureLayerModel[] = [];
  /* The input field placeholder text. */
  @Input() placeholder = 'Locaties zoeken...';
  /* Label to use when no results were found. */
  @Input() noResultsLabel = 'Er werden geen locaties gevonden.';
  /* Aria label for clear input button. */
  @Input() clearInputAriaLabel = 'Input veld leegmaken';
  /* Aria label for picking a location on the map */
  @Input() locationPickAriaLabel = 'Kies een locatie op de map';
  /* Aria label for zooming in */
  @Input() zoomInAriaLabel = 'Zoom in';
  /* Aria label for zooming out  */
  @Input() zoomOutAriaLabel = 'Zoom out';
  /* Aria label for text input */
  @Input() textInputAriaLabel = 'Locaties zoeken op basis van zoekterm';
  /* Default tile layer button label */
  @Input() defaultTileLayerLabel = 'Kaart';
  /* Custom leaflet tile layer, if provided, shows actions on the leaflet to toggle between default and custom tile layer. */
  @Input() tileLayer: LeafletTileLayerModel;
  /* Search input length requirement before triggering a search. */
  @Input() minInputLength = 2;
  /* The amount of results to return */
  @Input() locationsLimit = 5;
  /* The layers to search locations for */
  @Input() locationLayers = ['straatnaam'];
  /* Prioritize a layer, boosts results from a given layer to the top of the found locations. */
  @Input() prioritizeLayer = 'straatnaam';
  /* Sort locations by certain key, overrides prioritizeLayer. */
  @Input() sortBy = '';
  /* AddPolygon event */
  @Output() addPolygon = new EventEmitter<any>();
  /* AddLine event */
  @Output() addLine = new EventEmitter<any>();
  /* EditFeature event */
  @Output() editFeature = new EventEmitter<any>();
  /* LocationSelect event: fired when selecting a location. */
  @Output() locationSelect = new EventEmitter<LocationModel | AddressModel | CoordinateModel>();

  /* Leaflet instance */
  leafletMap: LeafletMap;
  /* Whether a search request is running or not. */
  searching = false;
  /* Whether a search was initiated or not. */
  didSearch = false;
  /* Whether the user clicked the pick location from map button or not. */
  pickLocationActive = false;
  /* The locations returned from the server. */
  foundLocations: LocationModel[] | AddressModel[] | CoordinateModel[] = [];
  /* Leaflet notification message */
  leafletNotification: NotificationModel;
  /* The current highlighted index in the location results array */
  highlightedLocationResult = 0;
  /* Current tile layer type default or custom */
  tileLayerType: LeafletTileLayerType = LeafletTileLayerType.DEFAULT;

  /* Current active location marker on the map */
  private selectedLocationMarker;
  /* Current active geometry on the map */
  private selectedLocationGeometry;
  /* Observable subscription for the input event */
  private inputChangeSubscription;
  /* Observable subscription for fetching locations */
  private locationServiceSubscription;
  /* Currently selected location */
  private _selectedLocation: any = {};
  /* Cursor state if hovering over leaflet or not */
  private cursorOnLeaflet = false;
  /* Current active tile layers */
  private activeTileLayers = [];

  /* Used for ControlValueAccessor */
  propagateChange = (_: any) => {
  };

  get selectedLocation() {
    return this._selectedLocation;
  }

  set selectedLocation(val) {
    this._selectedLocation = val;
    this.propagateChange(this._selectedLocation);
  }

  /**
   * Checks if input field has a value
   */
  get inputHasValue(): boolean {
    return (this.selectedLocation && !this.selectedLocation.label);
  }

  /**
   * Checks if foundLocations array has items.
   */
  get hasResults(): boolean {
    return (this.foundLocations && this.foundLocations.length > 0);
  }

  /**
   * Check if current tile layer is the default one.
   */
  get isDefaultTileLayer(): boolean {
    return (this.tileLayerType === LeafletTileLayerType.DEFAULT);
  }

  /**
   * Check if current tile layer is user defined.
   */
  get isCustomTileLayer(): boolean {
    return (this.tileLayerType === LeafletTileLayerType.CUSTOM);
  }

  /**
   * NgxLocationPickerComponent constructor, injects required dependencies
   */
  constructor(
    private locationPickerService: NgxLocationPickerService,
    private locationPickerHelper: NgxLocationPickerHelper,
    private renderer: Renderer2
  ) {
  }

  /**
   * On component init
   */
  ngOnInit() {
    /* if baseUrl is not set, throw an error. */
    if (!this.baseUrl) {
      throw new Error('baseUrl parameter is missing. Please pass in your BFF url.');
    }

    /* Only initialise leaflet map when it's required. */
    if (this.showMap) {
      this.initLocationPicker();
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy() {
    /* Unsubscribe input change subscription on component destroy */
    if (this.inputChangeSubscription) {
      this.inputChangeSubscription.unsubscribe();
    }
    /* Unsubscribe locationService subscription on component destroy */
    if (this.locationServiceSubscription) {
      this.locationServiceSubscription.unsubscribe();
    }
  }

  /**
   * Writes a new value to the element.
   */
  writeValue(location: any, reset: boolean = false): void {
    if (reset) {
      this.didSearch = false;
      this.searching = false;
      this.selectedLocation = {};
      this.locationSelect.emit(location);
    }

    if ((location && location.label) || (location && location.position && location.position.wgs84)) {
      this.selectedLocation = location;
      this.locationSelect.emit(location);
    }
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback function is called by the forms API on initialization to update the form model on blur.
   */
  registerOnTouched() {
  }

  /**
   * Zooms the map in
   */
  zoomIn() {
    this.leafletMap.zoomIn();
  }

  /**
   * Zooms the map out
   */
  zoomOut() {
    this.leafletMap.zoomOut();
  }

  /**
   * Clear search field value, If map is visible, resets to it's original position.
   */
  emptyField() {
    this.writeValue({}, true);

    if (this.showMap) {
      this.leafletMap.setView(this.mapCenter, this.defaultZoom);
      this.removeGeometry();
      this.removeMarker();
    }
  }

  /**
   * Allows location search by clicking somewhere on the map.
   */
  pickLocationOnMap() {
    if (this.pickLocationActive) {
      this.leafletMap.map.removeEventListener('click');
    } else {
      this.leafletMap.map.addEventListener('click', (event) => this.registerMapClick(event));
    }

    this.pickLocationActive = !this.pickLocationActive;
  }

  /**
   * Trigger search when input string is longer than 2 characters
   */
  onSearch(searchValue) {
    this.leafletNotification = null;
    this.highlightedLocationResult = 0;

    if (!searchValue.trim()) {
      this.emptyField();
    }

    if (searchValue.length >= this.minInputLength) {
      this.searching = true;
      this.didSearch = true;

      if (this.locationPickerHelper.isCoordinate(searchValue) && !this.pickLocationActive) {
        const coords: LambertModel = this.locationPickerHelper.extractXYCoord(searchValue);
        this.addMapMarker([coords.x, coords.y]);
      }

      this.locationServiceSubscription = this.locationPickerService.delegateSearch(
        searchValue,
        this.baseUrl,
        this.locationsLimit,
        this.locationLayers,
        this.prioritizeLayer,
        this.sortBy
      ).subscribe((response: LocationModel[] | AddressModel[] | CoordinateModel[]) => {
        this.foundLocations = response;
      }, (error) => {
        console.log(error);
      }, () => {
        this.searching = false;
      });
    }
  }

  /**
   * When a location is selected from the list.
   */
  onLocationSelect($event: any) {
    this.didSearch = false;

    if (this.showMap) {
      this.removeGeometry();

      if ($event.address && $event.address.addressPosition && $event.address.addressPosition.wgs84) {
        const coords: Array<number> = [$event.address.addressPosition.wgs84.lat, $event.address.addressPosition.wgs84.lng];
        this.addMapMarker(coords);
      } else if ($event.addressPosition && $event.addressPosition.wgs84) {
        const coords: Array<number> = [$event.addressPosition.wgs84.lat, $event.addressPosition.wgs84.lng];
        this.addMapMarker(coords);
      } else if ($event.position) {
        if ($event.position.wgs84) {
          const coords: Array<number> = [$event.position.wgs84.lat, $event.position.wgs84.lng];
          this.addMapMarker(coords);
        } else if ($event.position.geometry) {
          const geoJson = {
            type: 'Feature',
            properties: {
              name: $event.label,
            },
            geometry: {
              type: $event.position.geometryShape,
              coordinates: $event.position.geometry
            }
          };

          this.selectedLocationGeometry = this.leafletMap.addGeoJSON(geoJson, {});
        }
      } else if ($event.location && $event.location.position && $event.location.position.geometry) {
        const geoJson = {
          type: 'Feature',
          properties: {
            name: $event.label,
          },
          geometry: {
            type: $event.location.position.geometryShape,
            coordinates: $event.location.position.geometry
          }
        };

        this.selectedLocationGeometry = this.leafletMap.addGeoJSON(geoJson, {});
      } else {
        this.setNotification({
          status: 'm-alert--danger',
          text: 'Locatie kan niet op de map getoond worden.',
          icon: 'fa-exclamation-triangle'
        });
      }
    }

    this.writeValue($event);
  }

  /**
   * Implements keyboard and mouse commands
   */
  @HostListener('window:wheel', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onKeyCommand(event) {
    /* zoom in/out using ctrl + scroll to zoom in or out. Show notification if only scroll is used. */
    if (event.type === 'wheel' && this.cursorOnLeaflet) {
      if (event.shiftKey) {
        const direction = (event.deltaY > 0) ? 'out' : 'in';

        this.renderer.addClass(document.body, 'is-map-interaction');

        if (direction === 'out') {
          this.zoomOut();
        } else {
          this.zoomIn();
        }
      } else {
        this.renderer.removeClass(document.body, 'is-map-interaction');

        this.setNotification({
          status: 'default',
          text: 'Gebruik de CTRL toets om te zoomen door te scrollen.',
          icon: 'fa-question-circle'
        });
      }
    } else {
      this.renderer.removeClass(document.body, 'is-map-interaction');
    }

    /* Close flyout when escape key is pressed */
    if (event.key === 'Escape' && this.didSearch) {
      this.didSearch = false;
    }

    /* Cancel location search by click when escape key is pressed. */
    if (event.key === 'Escape') {
      this.leafletMap.map.removeEventListener('click');
      this.pickLocationActive = false;
    }

    if (this.foundLocations && this.foundLocations.length > 0 && this.didSearch) {
      /* When pressing enter, select first value in found locations list. */
      if (event.key === 'Enter') {
        this.onLocationSelect(this.foundLocations[this.highlightedLocationResult]);
      }

      /* When using arrow keys, select next/previous result in found locations list. */
      if (event.key === 'ArrowUp') {
        if (this.highlightedLocationResult > 0) {
          this.highlightedLocationResult--;
        }
      }

      if (event.key === 'ArrowDown') {
        if (this.highlightedLocationResult < this.foundLocations.length - 1) {
          this.highlightedLocationResult++;
        }
      }
    }
  }

  /**
   * Determines whether the cursor is hovering over the leaflet instance or not.
   */
  isCursorOnLeaflet(cursorOnLeaflet: boolean) {
    this.cursorOnLeaflet = cursorOnLeaflet;
  }

  /**
   * Toggle tile layer when a custom tile layer is provided
   */
  toggleTileLayer(custom: boolean = false) {
    this.resetCurrentTileLayers();

    this.tileLayerType = (custom) ? LeafletTileLayerType.CUSTOM : LeafletTileLayerType.DEFAULT;

    if (custom) {
      this.activeTileLayers.push(this.leafletMap.addTileLayer(this.tileLayer.layer));
    } else {
      this.activeTileLayers.push(this.leafletMap.addTileLayer(baseMapWorldGray));
      this.activeTileLayers.push(this.leafletMap.addTileLayer(baseMapAntwerp));
    }
  }

  /**
   * Resets the current tile layers
   */
  private resetCurrentTileLayers() {
    if (this.activeTileLayers.length > 0) {
      this.activeTileLayers.map((layer) => {
        this.leafletMap.removeLayer(layer);
      });
    }

    this.activeTileLayers = [];
  }

  /**
   * Init leaflet map with default values and register feature layers if provided.
   */
  private initLocationPicker() {
    this.leafletMap = new LeafletMap({
      zoom: this.defaultZoom,
      center: this.mapCenter,
      onAddPolygon: (layer) => {
        this.addPolygon.emit(layer);
      },
      onAddLine: (layer) => {
        this.addLine.emit(layer);
      },
      onEditFeature: (feature) => {
        this.editFeature.emit(feature);
      },
    });

    this.leafletMap.onInit.subscribe(() => {
      this.activeTileLayers.push(this.leafletMap.addTileLayer(baseMapWorldGray));
      this.activeTileLayers.push(this.leafletMap.addTileLayer(baseMapAntwerp));

      if (this.selectedLocation && this.selectedLocation.position) {
        const coords: Array<number> = [this.selectedLocation.position.lat, this.selectedLocation.position.lng];
        this.addMapMarker(coords);
      }

      this.registerFeatureLayers();
    });
  }

  /**
   * Capture coordinates from clicking the map and run a search.
   */
  private registerMapClick($event) {
    this.leafletMap.map.removeEventListener('click');
    this.pickLocationActive = false;

    if ($event.latlng) {
      this.writeValue({position: {wgs84: {lat: $event.latlng.lat, lng: $event.latlng.lng}}});

      this.selectedLocation.label = `${$event.latlng.lat},${$event.latlng.lng}`;
      this.onSearch(`${$event.latlng.lat},${$event.latlng.lng}`);
      this.addMapMarker([$event.latlng.lat, $event.latlng.lng]);
    }
  }

  /**
   * Registers optional feature layers and adds markers to the leaflet instance.
   */
  private registerFeatureLayers() {
    if (this.featureLayers.length > 0) {
      this.featureLayers.map((featureLayer: FeatureLayerModel) => {
        this.leafletMap.addFeatureLayer({
          url: featureLayer.url,
          pointToLayer: (geojson, latlng) => {
            return this.leafletMap.addHtmlMarker(latlng, this.createMarker(
              (featureLayer.icon && featureLayer.icon.color) ? featureLayer.icon.color : undefined,
              (featureLayer.icon && featureLayer.icon.iconClass) ? featureLayer.icon.iconClass : undefined,
              (featureLayer.icon && featureLayer.icon.size) ? featureLayer.icon.size : undefined,
            ));
          },
        });
      });
    }
  }

  /**
   * Adds a marker on a given coordinate and zooms in on this location.
   *
   * @param coords array containing lat & lng
   */
  private addMapMarker(coords) {
    this.removeMarker();

    this.selectedLocationMarker = this.leafletMap.addHtmlMarker(coords, this.createMarker());
    this.leafletMap.setView(coords, this.onSelectZoom);
  }

  /**
   * Defines the custom marker markup.
   */
  private createMarker(color: string = '#0064b4', icon: string = 'fa-map-marker', size: string = '40px') {
    const markerStyle = `color: ${color}; font-size: ${size}`;
    const markerIcon = `<i class="fa ${icon}" aria-hidden="true"></i>`;

    return `<span style="${markerStyle}" class="ngx-location-picker-marker">${markerIcon}</span>`;
  }

  /**
   * Removes specific marker from leaflet instance.
   */
  private removeMarker() {
    if (this.selectedLocationMarker) {
      this.leafletMap.removeLayer(this.selectedLocationMarker);
    }
  }

  /**
   * Removes added geometry area from leaflet instance.
   */
  private removeGeometry() {
    if (this.selectedLocationGeometry) {
      this.leafletMap.removeLayer(this.selectedLocationGeometry);
    }
  }

  /**
   * Show a notification on the leaflet map.
   */
  private setNotification(notification: NotificationModel) {
    this.leafletNotification = notification;

    setTimeout(() => {
      this.leafletNotification = null;
    }, 4000);
  }
}
