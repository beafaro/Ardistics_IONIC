import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino } from 'src/app/services/api.service';

@Component({
  selector: 'app-arduinos',
  templateUrl: './arduinos.component.html',
  styleUrls: ['./arduinos.component.scss'],
})
export class ArduinosComponent implements OnInit {

  @Output() eventoCrearArduino = new EventEmitter<any>();
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

  nuevoArduino() {
    this.eventoCrearArduino.emit("nuevo");
  }


  borrarArduino(arduino: any) {
    this.apiService.deleteArduino(arduino.id_arduino).subscribe(
      (res) => {
        const indiceABorrar = this.arduinos.findIndex((ard: any) => {
            return (ard.id_arduino === arduino.id_arduino);
        });

        if (-1 != indiceABorrar) {
            this.arduinos.splice(indiceABorrar, 1);
        }

      },
      (err) => {
        console.log(err);
      }
    );
  }

}