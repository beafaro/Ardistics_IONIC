import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArdisticsPage } from './ardistics.page';
import { ArduinosComponent } from './arduinos/arduinos.component';

const routes: Routes = [
  {
    path: '',
    component: ArdisticsPage
  },
  {
    path: 'arduinos',
    component: ArduinosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArdisticsPageRoutingModule {}
