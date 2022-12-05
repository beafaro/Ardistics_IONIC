import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino, EstadoPines } from 'src/app/services/api.service';

@Component({
  selector: 'arduinos-component',
  templateUrl: './arduinos.component.html',
  styleUrls: ['./arduinos.component.scss'],
})

export class ArduinosComponent implements OnInit {

  @Output() eventoSeleccionarArduino = new EventEmitter<any>();
  id_arduino!: string;

  arduinos: Arduino[] = [];

  constructor(private loadingCtrl: LoadingController, 
              private apiService: ApiService) { }

  ngOnInit() {
    this.cargarArduinos();
  }

  async cargarArduinos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
 
    this.apiService.getAllArduinos().subscribe(
      (res) => {
        loading.dismiss();
        this.arduinos = res;
 
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  seleccionarArduino(arduino: any) {
    console.log(arduino);
    this.id_arduino = arduino.id_arduino;

    this.eventoSeleccionarArduino.emit(this.id_arduino);
  }

}
