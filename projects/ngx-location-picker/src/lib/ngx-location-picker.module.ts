import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule, MapService} from '@acpaas-ui/ngx-components/map';
import {NgxLocationPickerComponent} from './components/ngx-location-picker.component';
import {HighlightSearchDirective} from './directives/highlight-search.directive';

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
        {
            provide: MapService,
            useValue: new MapService('browser'),
        }
    ]
})
export class LocationPickerModule {
}
