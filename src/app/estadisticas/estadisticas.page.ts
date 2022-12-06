import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino, EstadoPines } from '../services/api.service';



export interface mapEstadoPines {
  key: string;
  array: EstadoPines[];
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  arduinos: Arduino[] = [];
  pines: number[] = [];

  filtroArduino!: string;
  filtroEstadistica!: string;
  filtroFechaInicio!: Date;
  filtroFechaFin!: Date;
  filtroIntervalo!: string;
  filtroPin!: number;

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

  cargarPines() {
    this.apiService.getArduino(this.filtroArduino).subscribe(
      (res) => {        
        this.pines = [];

        for( let i = 0; i < res[0].num_pines; i++) {
          this.pines.push(i);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  calcular() {
    this.apiService.getDatosArduino(this.filtroArduino, this.filtroPin).subscribe(
      (res) => {        

        let datosAgrupados: {[key: string] : EstadoPines[]} = {};
        res.forEach( (dato) => {
            if (dato.fecha >= this.filtroFechaInicio && dato.fecha <= this.filtroFechaFin) {
              let fecha = new Date(dato.fecha);
              let key: string;

              if(this.filtroIntervalo == "DIA"){
                key = fecha.getFullYear()+"_"+(fecha.getMonth()+1)+"_"+ fecha.getDate();
              } else if(this.filtroIntervalo == "MES"){
                key = fecha.getFullYear()+"_"+(fecha.getMonth()+1);
              } else {
                key = fecha.getFullYear()+"_"+(fecha.getMonth()+1)+"_"+ fecha.getDate();
              }

              if(datosAgrupados[key]== null){
                datosAgrupados[key]= [];
              }

              datosAgrupados[key].push(dato);
            }
          } 
        )

        console.log(datosAgrupados);

      },

      (err) => {
        console.log(err);
      }
    );
  }

}
