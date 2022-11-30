import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArdisticsPageRoutingModule } from './ardistics-routing.module';

import { ArdisticsPage } from './ardistics.page';
import { ArduinosComponent } from './arduinos/arduinos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArdisticsPageRoutingModule
  ],
  declarations: [ArdisticsPage, ArduinosComponent],
  entryComponents:[ArduinosComponent]
})
export class ArdisticsPageModule {}
