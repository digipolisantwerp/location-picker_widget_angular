import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LocationPickerV1Module } from '../../src';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    LocationPickerV1Module,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
