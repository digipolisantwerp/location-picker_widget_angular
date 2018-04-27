import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ExampleComponent,
  ],
  declarations: [
    ExampleComponent,
  ],
  providers: [],
})
export class ExampleModule { }
