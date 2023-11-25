import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineChartRoutingModule } from './line-chart-routing.module';
import { DialogsModule } from '@modules/dialogs/dialogs.module';
import { NgxEchartsModule } from 'ngx-echarts';

// Components
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { OptionsComponent } from './components/options/options.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LineChartComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    LineChartRoutingModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),     

    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule
  ]
})
export class LineChartModule { }
