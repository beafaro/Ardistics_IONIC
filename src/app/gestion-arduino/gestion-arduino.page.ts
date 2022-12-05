import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-arduino',
  templateUrl: './gestion-arduino.page.html',
  styleUrls: ['./gestion-arduino.page.scss'],
})
export class GestionArduinoPage implements OnInit {

  formulario!: string;

  constructor() { }

  ngOnInit() {
    this.formulario = "listado";
  }

  setFormulario(form: string) {
    this.formulario = form;
  }
}
