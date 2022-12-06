import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, Arduino } from 'src/app/services/api.service';

@Component({
  selector: 'nuevo-arduino-component',
  templateUrl: './gestion-arduino.component.html',
  styleUrls: ['./gestion-arduino.component.scss'],
})
export class GestionArduinoComponent implements OnInit {

  @Output() eventoVolverListadoArduinos = new EventEmitter<any>();
  formulario!: FormGroup;

  constructor(private apiService: ApiService, public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre_arduino: ['', Validators.required], 
      num_pines: ['', Validators.required],
    })
  }

  crearArduino() {
    console.log(this.formulario.value);

    this.apiService.createArduino(this.formulario.value).subscribe(
      (res) => {
        this.eventoVolverListadoArduinos.emit("listado");   
      },
      (err) => {
        console.log(err);
      }
    );
  }

  volverListadoArduinos() {
    this.eventoVolverListadoArduinos.emit("listado");
  }
}
