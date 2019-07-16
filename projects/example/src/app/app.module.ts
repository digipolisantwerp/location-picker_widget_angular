import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxLocationPickerModule} from '../../../../dist/ngx-location-picker';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxLocationPickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
