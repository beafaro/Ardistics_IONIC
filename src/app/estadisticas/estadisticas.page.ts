import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ApiService, Arduino, EstadoPines } from '../services/api.service';
import { Chart, registerables } from 'chart.js';


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

  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;
  lineChart: any;
  datosCalculados: boolean = false;
  hayErrores: boolean = false;

  arduinos: Arduino[] = [];
  pines: number[] = [];
  

  filtroArduino!: string;
  filtroEstadistica!: string;
  filtroFechaInicio!: string;
  filtroFechaFin!: string;
  filtroIntervalo!: string;
  filtroPin!: number;

  constructor(private loadingCtrl: LoadingController, 
              private apiService: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.filtroFechaInicio = (new Date()).toISOString()
    this.filtroFechaFin = (new Date()).toISOString()
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
    if (this.filtroArduino == undefined || this.filtroEstadistica == undefined || this.filtroIntervalo == undefined || this.filtroPin == undefined) {
      this.hayErrores = true;
      return;    
    } else {
      this.hayErrores = false;
    }
    
    this.datosCalculados = true;

    this.apiService.getDatosArduino(this.filtroArduino, this.filtroPin).subscribe(
      (res) => {        

        //agrupar datos
        let datosAgrupados: {[key: string] : EstadoPines[]} = {};

        // Preparamos todas las posibles claves
        let fechaTemporal = new Date(this.filtroFechaInicio);
        if(this.filtroIntervalo == "DIA"){
          while(fechaTemporal <= new Date(this.filtroFechaFin)){
            let key: string = fechaTemporal.getFullYear()+"_"+(fechaTemporal.getMonth()+1)+"_"+ fechaTemporal.getDate();
            datosAgrupados[key]= [];
            fechaTemporal.setDate(fechaTemporal.getDate()+1);
          }
        } else if(this.filtroIntervalo == "MES"){
          while(fechaTemporal <= new Date(this.filtroFechaFin)){
            let key: string = fechaTemporal.getFullYear()+"_"+(fechaTemporal.getMonth()+1);
            datosAgrupados[key]= [];
            fechaTemporal.setMonth(fechaTemporal.getMonth()+1);
          }
        }


        // Agrupamos los datos
        res.forEach( (dato) => {
            let fechaFiltroInicio = new Date(this.filtroFechaInicio);
            let fechaFiltroFin = new Date(this.filtroFechaFin);
            if (new Date(dato.fecha) >= fechaFiltroInicio && new Date(dato.fecha) <= fechaFiltroFin) {
              let fecha = new Date(dato.fecha);
              let key!: string;

              if(this.filtroIntervalo == "DIA"){
                key = fecha.getFullYear()+"_"+(fecha.getMonth()+1)+"_"+ fecha.getDate();
              } else if(this.filtroIntervalo == "MES"){
                key = fecha.getFullYear()+"_"+(fecha.getMonth()+1);
              }

              if(datosAgrupados[key]== null){
                datosAgrupados[key]= [];
              }

              datosAgrupados[key].push(dato);
            }
          } 
        )

        //console.log(datosAgrupados);

        //crear estadísticas
        let estadisticas: {[key: string] : number} = {};
        if (this.filtroEstadistica == "NUM_VECES") {
          let keys = Object.keys(datosAgrupados);
          keys.forEach( (key) => {
            estadisticas[key] = 0;
            datosAgrupados[key].forEach( (dato) => {
              if (dato.valor == true) {
                estadisticas[key]++;
              }
            });
          });

        } else if (this.filtroEstadistica == "TIEMPO") {
          let keys = Object.keys(datosAgrupados);
          keys.forEach( (key) => {
            estadisticas[key] = 0;
            
            // Si hay datos para la clave
            if (datosAgrupados[key].length > 0) {

              let estadoAnterior!: EstadoPines;
              datosAgrupados[key].forEach( (dato) => {
                
                // Si no tenemos un estado anterior, es el primero que encontramos
                if (estadoAnterior == null) {
                  // Si el primer dato es que se apaga, es que venimos de estar encencidos
                  if(dato.valor == false){
                    let fechaAnterior = new Date(dato.fecha);
                    fechaAnterior.setHours(0);
                    fechaAnterior.setMinutes(0);
                    fechaAnterior.setSeconds(0);
                    fechaAnterior.setMilliseconds(0);

                    // Si el intervalo es de meses, consideramos que esta encendido desde el dia 1
                    if(this.filtroIntervalo == "MES"){
                      fechaAnterior.setDate(1);
                    }
                    
                    let fechaDato = new Date(dato.fecha);
                    let diferencia = fechaDato.getTime() - fechaAnterior.getTime(); // en milisegundos

                    let diferenciaMinutos = diferencia / 60000;

                    estadisticas[key] = estadisticas[key] + diferenciaMinutos;
                  }
                  
                  estadoAnterior = dato;

                } else {
                  // Si el anterior estaba encendido y el actual indica que se apago
                  if (estadoAnterior.valor == true && dato.valor == false) {
                    let fechaAnterior = new Date(estadoAnterior.fecha);
                    let fechaDato = new Date(dato.fecha);
                    let diferencia = fechaDato.getTime() - fechaAnterior.getTime(); // en milisegundos

                    let diferenciaMinutos = diferencia / 60000;

                    estadisticas[key] = estadisticas[key] + diferenciaMinutos;

                  }

                  estadoAnterior=dato;
                }
              });

              // Si el ultimo estado indica que se quedo encendido, calculamos hasta el final del intervalo
              if(estadoAnterior.valor == true){
                let fechaAnterior = new Date(estadoAnterior.fecha);
                let fechaSiguiente = new Date(estadoAnterior.fecha);
                fechaSiguiente.setHours(0);
                fechaSiguiente.setMinutes(0);
                fechaSiguiente.setSeconds(0);
                fechaSiguiente.setMilliseconds(0);

                // Si el intervalo es de dias, ponemos las 12 de la noche del dia siguiente
                if(this.filtroIntervalo == "DIA"){
                  fechaSiguiente.setDate(fechaSiguiente.getDate()+1);

                } else if(this.filtroIntervalo == "MES"){ // Si el intervalo es de meses, calculamos hasta el dia 1 del mes siguiente
                  fechaSiguiente.setDate(1);
                  if(fechaSiguiente.getMonth() < 11){ // Excepto en diciembre, agregamos 1 mes
                    fechaSiguiente.setMonth(fechaSiguiente.getMonth()+1)
                  } else { // Cambio de anho, estamos en diciembre
                    fechaSiguiente.setFullYear(fechaSiguiente.getFullYear()+1);
                    fechaSiguiente.setMonth(0);
                  }
                }
                
                let diferencia = fechaSiguiente.getTime() - fechaAnterior.getTime(); // en milisegundos
                let diferenciaMinutos = diferencia / 60000;

                estadisticas[key] = estadisticas[key] + diferenciaMinutos;
              }
            }
          });
        }


        //console.log(estadisticas);
        this.lineChartMethod(estadisticas);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  lineChartMethod(estadisticas: {[key: string] : number}) {
    let labels = Object.keys(estadisticas);
    let datos: number[] = [];

    labels.forEach( (key) => {
      datos.push(estadisticas[key]);
    });

    if (this.lineChart) {
        this.lineChart.destroy();
    }

    let labelGrafico: string;
    if(this.filtroEstadistica == "NUM_VECES"){
      labelGrafico = "Veces activado";
    } else {
      labelGrafico = "Tiempo activo (mins)";
    }

    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: labelGrafico,
            fill: false,
            //lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: datos,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
