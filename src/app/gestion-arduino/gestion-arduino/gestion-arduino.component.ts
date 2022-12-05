import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nuevo-arduino-component',
  templateUrl: './gestion-arduino.component.html',
  styleUrls: ['./gestion-arduino.component.scss'],
})
export class GestionArduinoComponent implements OnInit {

  @Output() eventoVolverListadoArduinos = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  volverListadoArduinos() {

    this.eventoVolverListadoArduinos.emit("listado");
  }

}
