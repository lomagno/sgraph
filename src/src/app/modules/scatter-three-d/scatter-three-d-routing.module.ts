import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScatterThreeDComponent } from './components/scatter-three-d/scatter-three-d.component';

const routes: Routes = [
  {
    path: '',
    component: ScatterThreeDComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScatterThreeDRoutingModule { }
