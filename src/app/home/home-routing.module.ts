import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ArduinosComponent } from './arduinos/arduinos.component';
import { EstadoArduinoComponent } from './estado-arduino/estado-arduino.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'arduinos',
    component: ArduinosComponent
  },
  {
    path: 'estado-arduino',
    component: EstadoArduinoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
