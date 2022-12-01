import { Component, Input, OnInit } from '@angular/core';
import { ArduinosComponent } from './arduinos/arduinos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public home!: string;

  constructor() { }

  ngOnInit() {
    this.home = "Ardistics";
  }

  onChangeArduino(id_arduino: string) {
    console.log(id_arduino);
  }

}