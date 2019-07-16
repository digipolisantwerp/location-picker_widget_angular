import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeafletModule} from '@acpaas-ui/ngx-components/map';
import {NgxLocationPickerComponent} from './components/ngx-location-picker.component';

@NgModule({
    declarations: [
        NgxLocationPickerComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        LeafletModule
    ],
    exports: [
        NgxLocationPickerComponent
    ]
})
export class NgxLocationPickerModule {
}
