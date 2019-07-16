import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {LeafletMap, baseMapWorldGray, baseMapAntwerp} from '@acpaas-ui/ngx-components/map';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxLocationPickerService} from '../services/ngx-location-picker.service';
import {FeatureLayerModel} from '../types/feature-layer.model';
import {LocationModel} from '../types/location.model';
import {AddressModel} from '../types/address.model';
import {CoordinateModel} from '../types/coordinate.model';
import {NotificationModel} from '../types/notification.model';

@Component({
    selector: 'ngx-location-picker',
    templateUrl: './ngx-location-picker.component.html',
    styleUrls: ['./ngx-location-picker.component.css']
})

export class NgxLocationPickerComponent implements OnInit, OnDestroy {

    /* url to the backend-for-frontend (bff) Should function as pass through to the Location Picker API. */
    @Input() baseUrl;
    /* the default zoom level on map load. */
    @Input() defaultZoom = 14;
    /* the zoom level when a location is selected. */
    @Input() onSelectZoom = 16;
    /* the initial map center on load. */
    @Input() mapCenter: Array<number> = [51.215, 4.425];
    /* show a sidebar next to the map leaflet. */
    @Input() hasSidebar = false;
    /* show or hide the map. */
    @Input() showMap = true;
    /* add layers to show on the map. eg: A-card terminals, Velo stations, ... */
    @Input() featureLayers: FeatureLayerModel[] = [];
    /* the input field placeholder text. */
    @Input() placeholder = 'Locaties zoeken...';
    /* label to show above the search field. */
    @Input() label = '';
    /* label to use when no results were found. */
    @Input() noResultsLabel = 'Er werden geen locaties gevonden.';
    /* addPolygon event */
    @Output() addPolygon = new EventEmitter<any>();
    /* addLine event */
    @Output() addLine = new EventEmitter<any>();
    /* editFeature event */
    @Output() editFeature = new EventEmitter<any>();
    /* locationSelect event: fired when selecting a location. */
    @Output() locationSelect = new EventEmitter<LocationModel | AddressModel | CoordinateModel>();

    /* leaflet instance */
    leafletMap: LeafletMap;
    /* leaflet search form */
    leafletForm: FormGroup;
    /* Whether a search request is running or not. */
    searching = false;
    /* Whether a search was initiated or not. */
    didSearch = false;
    /* The locations returned from the server. */
    foundLocations: LocationModel[] | AddressModel[] | CoordinateModel[] = [];
    /* Leaflet notification message */
    leafletNotification: NotificationModel;

    /* Current active location marker on the map */
    private selectedLocationMarker;
    /* Current active geometry on the map */
    private selectedLocationGeometry;
    /* Observable subscription for the input event */
    private inputChangeSubscription;
    /* Observable subscription for fetching locations */
    private locationServiceSubscription;

    /* Checks if input field has a value */
    get inputHasValue(): boolean {
        return (this.leafletForm && !this.leafletForm.get('searchField').value);
    }

    /* Checks if foundLocations array has items. */
    get hasResults(): boolean {
        return (this.foundLocations && this.foundLocations.length > 0);
    }

    /* Component constructor, injects dependencies */
    constructor(
        private formBuilder: FormBuilder,
        private locationPickerService: NgxLocationPickerService
    ) {
    }

    /* On component initialisation */
    ngOnInit() {
        /* if baseUrl is not set, throw an error. */
        if (!this.baseUrl) {
            throw new Error('baseUrl parameter is missing. Please pass in your BFF url.');
        }

        /* Only initialise leaflet map when it's required. */
        if (this.showMap) {
            this.initLocationPicker();
        }

        /* Inits search form. */
        this.initLeafletForm();
    }

    /* On component destroy */
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

    /* Clear search field value, If map is visible, resets to it's original position. */
    emptyField() {
        this.leafletForm.get('searchField').patchValue('');
        this.didSearch = false;
        this.searching = false;

        if (this.showMap) {
            this.leafletMap.setView(this.mapCenter, this.defaultZoom);
            this.removeMarker(this.selectedLocationMarker);
            this.removeGeometry(this.selectedLocationGeometry);
        }
    }

    /* When a found location is selected from the list. */
    onLocationSelect($event: any) {
        this.leafletForm.get('searchField').patchValue($event.label, {emitEvent: false});
        this.didSearch = false;

        if (this.showMap) {
            this.removeMarker(this.selectedLocationMarker);

            /*
            * TODO: Do this a little cleaner. 🤨
            * */

            if ($event.address && $event.address.addressPosition && $event.address.addressPosition.wgs84) {
                const coords: Array<number> = [$event.address.addressPosition.wgs84.lat, $event.address.addressPosition.wgs84.lng];
                this.selectedLocationMarker = this.leafletMap.addHtmlMarker(coords, this.createMarker());
                this.leafletMap.setView(coords, this.onSelectZoom);
            } else if ($event.addressPosition && $event.addressPosition.wgs84) {
                const coords: Array<number> = [$event.addressPosition.wgs84.lat, $event.addressPosition.wgs84.lng];
                this.selectedLocationMarker = this.leafletMap.addHtmlMarker(coords, this.createMarker());
                this.leafletMap.setView(coords, this.onSelectZoom);
            } else if ($event.position && $event.position.wgs84) {
                const coords: Array<number> = [$event.position.wgs84.lat, $event.position.wgs84.lng];
                this.selectedLocationMarker = this.leafletMap.addHtmlMarker(coords, this.createMarker());
                this.leafletMap.setView(coords, this.onSelectZoom);
            } else if ($event.location.position.geometry) {
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
                this.leafletNotification = {
                    status: 'warning',
                    text: 'Locatie kan niet op de map getoond worden.',
                    icon: 'fa-exclamation-triangle'
                };
            }
        }

        this.locationSelect.emit($event);
    }

    /* Init leaflet map with default values and register feature layers if provided. */
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
            this.leafletMap.addTileLayer(baseMapWorldGray);
            this.leafletMap.addTileLayer(baseMapAntwerp);

            this.leafletMap.map.addEventListener('click', (event) => this.registerMapClick(event));

            this.registerFeatureLayers();
        });
    }

    /* Capture coordinates from clicking the map and run a search. */
    private registerMapClick($event) {
        this.removeMarker(this.selectedLocationMarker);

        if ($event.latlng) {
            this.leafletForm.get('searchField').patchValue(`${$event.latlng.lat},${$event.latlng.lng}`);
            this.selectedLocationMarker = this.leafletMap.addHtmlMarker([$event.latlng.lat, $event.latlng.lng], this.createMarker());
        }
    }

    /* Registers optional feature layers and adds markers to the leaflet instance. */
    private registerFeatureLayers() {
        if (this.featureLayers.length > 0) {
            this.featureLayers.map((featureLayer: FeatureLayerModel) => {
                this.leafletMap.addFeatureLayer({
                    url: featureLayer.url,
                    pointToLayer: (geojson, latlng) => {
                        this.leafletMap.addHtmlMarker(latlng, this.createMarker(
                            featureLayer.icon.backgroundColor,
                            featureLayer.icon.textColor,
                            featureLayer.icon.faIcon)
                        );
                    },
                });
            });
        }
    }

    /* Defines the custom marker markup. */
    private createMarker(background: string = 'rgb(0, 100, 180)', color: string = '#fff', icon: string = 'fa-map-marker') {
        const markerStyle = `background-color: ${background}; color: ${color};`;
        const markerIcon = `<i class="fa ${icon}" aria-hidden="true"></i>`;

        return `<span style="${markerStyle}" class="ngx-location-picker-marker">${markerIcon}</span>`;
    }

    /* Removes specific marker from leaflet instance. */
    private removeMarker(marker) {
        if (marker) {
            this.leafletMap.removeLayer(marker);
        }
    }

    /* Removes added geometry area from leaflet instance */
    private removeGeometry(geometry) {
        if (geometry) {
            this.leafletMap.removeLayer(geometry);
        }
    }

    /* Init leaflet form and setup input listener for triggering searches. */
    private initLeafletForm() {
        this.leafletForm = this.formBuilder.group({
            searchField: ['']
        });

        this.inputChangeSubscription = this.leafletForm.get('searchField').valueChanges.subscribe((changes: string) => {
            this.leafletNotification = null;
            this.foundLocations = [];

            if (changes.length === 0) {
                this.didSearch = false;
            }

            if (changes.length > 2) {
                this.searching = true;
                this.didSearch = true;
                this.locationServiceSubscription = this.locationPickerService.delegateSearch(changes, this.baseUrl)
                    .subscribe((response: LocationModel[] | AddressModel[] | CoordinateModel[]) => {
                        this.foundLocations = response;
                    }, (error) => {
                        console.log(error);
                    }, () => {
                        this.searching = false;
                    });
            }
        });
    }

}