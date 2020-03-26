import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AutoCompleteModule } from '@acpaas-ui/ngx-components/forms';

import { LocationPickerV1Component } from './location-picker/location-picker.component';
import { LocationPickerV1Service } from './location-picker/location-picker.service';

@NgModule({
  imports: [ CommonModule, FormsModule, AutoCompleteModule, HttpClientModule ],
  declarations: [ LocationPickerV1Component ],
  providers: [ LocationPickerV1Service ],
  exports: [ LocationPickerV1Component ]
})

export class LocationPickerV1Module {
}
