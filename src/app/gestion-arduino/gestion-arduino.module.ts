import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionArduinoPageRoutingModule } from './gestion-arduino-routing.module';

import { GestionArduinoPage } from './gestion-arduino.page';
import { ArduinosComponent } from './arduinos/arduinos.component';
import { GestionArduinoComponent } from './gestion-arduino/gestion-arduino.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionArduinoPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [GestionArduinoPage, ArduinosComponent, GestionArduinoComponent],
  entryComponents:[ArduinosComponent]
})
export class GestionArduinoPageModule {}
