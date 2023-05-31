import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LocationPickerModule } from "projects/ngx-location-picker/src/lib/ngx-location-picker.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LocationPickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
