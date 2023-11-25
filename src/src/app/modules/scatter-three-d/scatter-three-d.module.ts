import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ScatterThreeDRoutingModule } from './scatter-three-d-routing.module';
import { ScatterThreeDComponent } from './components/scatter-three-d/scatter-three-d.component';
import { OptionsComponent } from './components/options/options.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ScatterThreeDComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    ScatterThreeDRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),  
    
    // Angular Material
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class ScatterThreeDModule { }
