import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LocationPickerModule } from '../../src';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    LocationPickerModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
