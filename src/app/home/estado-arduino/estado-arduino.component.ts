import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'estado-arduino',
  templateUrl: './estado-arduino.component.html',
  styleUrls: ['./estado-arduino.component.scss'],
})
export class EstadoArduinoComponent implements OnInit {

  @Input() id_arduino!: string;
  @Output() eventoDesSeleccionarArduino = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}
  
  
  desSeleccionarArduino(arduino: any) {
    //console.log(arduino);
    this.id_arduino = arduino.id_arduino;

    this.eventoDesSeleccionarArduino.emit(this.id_arduino);
  }
  

}
