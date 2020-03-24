import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@acpaas-ui/ngx-components/map';
import {NgxLocationPickerComponent} from './components/ngx-location-picker.component';
import {HighlightSearchDirective} from './directives/highlight-search.directive';
import {MAP_SERVICE_PROVIDER} from './map.provider';

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
        LeafletModule
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
