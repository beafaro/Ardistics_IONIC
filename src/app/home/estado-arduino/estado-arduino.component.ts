import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino, EstadoPines } from 'src/app/services/api.service';

@Component({
  selector: 'estado-arduino',
  templateUrl: './estado-arduino.component.html',
  styleUrls: ['./estado-arduino.component.scss'],
})
export class EstadoArduinoComponent implements OnInit {

  arduino!: Arduino;
  @Input() id_arduino!: string;
  @Output() eventoDesSeleccionarArduino = new EventEmitter<any>();
  
  estadoPines: EstadoPines[] = [];

  constructor(private loadingCtrl: LoadingController, 
              private apiService: ApiService) { }

  ngOnInit() {
    this.cargarEstadoArduino();
  }

  async cargarEstadoArduino(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.apiService.getArduino(this.id_arduino).subscribe(
      (res) => {
        loading.dismiss();
        this.arduino = res[0];
 
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
 
    this.apiService.getInfoEstadoPines(this.id_arduino).subscribe(
      (res) => {
        loading.dismiss();
        this.estadoPines = res;
 
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
    
  desSeleccionarArduino(arduino: any) {
    this.id_arduino = arduino.id_arduino;
    this.eventoDesSeleccionarArduino.emit(this.id_arduino);
  }
  

}
