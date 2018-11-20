import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AutoCompleteModule } from '@acpaas-ui/ngx-components/forms';

import { LocationPickerComponent } from './location-picker/location-picker.component';
import { LocationPickerService } from './location-picker/location-picker.service';

@NgModule({
  imports: [ CommonModule, FormsModule, AutoCompleteModule, HttpClientModule ],
  declarations: [ LocationPickerComponent ],
  providers: [ LocationPickerService ],
  exports: [ LocationPickerComponent ]
})

export class LocationPickerModule {
}
