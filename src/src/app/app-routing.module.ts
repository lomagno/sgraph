import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'line-chart',
    loadChildren: () => import('./modules/line-chart/line-chart.module')
      .then(m => m.LineChartModule)
  },
  { 
    path: '3d-scatter',
    loadChildren: () => import(
      './modules/scatter-three-d/scatter-three-d.module')
      .then(m => m.ScatterThreeDModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
