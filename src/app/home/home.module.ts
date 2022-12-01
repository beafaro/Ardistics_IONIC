import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ArduinosComponent } from './arduinos/arduinos.component';
import { EstadoArduinoComponent } from './estado-arduino/estado-arduino.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ArduinosComponent, EstadoArduinoComponent],
  entryComponents:[ArduinosComponent]
})
export class HomePageModule {}
