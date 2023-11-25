import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

// Angular Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const components = [
  SpinnerComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,

    // Angular Material
    MatProgressSpinnerModule
  ],
  exports: [
    ...components
  ]
})
export class CommonComponentsModule { }
