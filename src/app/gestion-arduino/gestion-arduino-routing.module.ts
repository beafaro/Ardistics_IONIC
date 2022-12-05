import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionArduinoPage } from './gestion-arduino.page';

const routes: Routes = [
  {
    path: '',
    component: GestionArduinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionArduinoPageRoutingModule {}
