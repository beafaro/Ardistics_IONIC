import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino } from 'src/app/services/api.service';

@Component({
  selector: 'arduinos-component',
  templateUrl: './arduinos.component.html',
  styleUrls: ['./arduinos.component.scss'],
})
export class ArduinosComponent implements OnInit {

  arduinos: Arduino[] = [];

  constructor(private loadingCtrl: LoadingController, private apiService: ApiService) { }

  ngOnInit() {
    this.cargarArduinos();
  }


  async cargarArduinos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();
 
    this.apiService.getAll().subscribe(
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
}
