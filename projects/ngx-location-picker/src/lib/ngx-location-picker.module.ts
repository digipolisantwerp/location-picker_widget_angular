import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@acpaas-ui/ngx-leaflet';
import {NgxLocationPickerComponent} from './components/ngx-location-picker.component';
import {HighlightSearchDirective} from './directives/highlight-search.directive';
import {MAP_SERVICE_PROVIDER} from './map.provider';

import { LocationViewerModule } from '@acpaas-ui-widgets/ngx-location-viewer';

@NgModule({
    declarations: [
        NgxLocationPickerComponent,
        HighlightSearchDirective
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        LeafletModule,
        LocationViewerModule
    ],
    exports: [
        NgxLocationPickerComponent,
    ],
    providers: [
        MAP_SERVICE_PROVIDER
    ]
})
export class LocationPickerModule {
}
