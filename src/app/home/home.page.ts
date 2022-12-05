import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public id_arduino!: string;

  constructor() { }

  ngOnInit() {
  }

  onChangeArduino(id_arduino: string) {
    this.id_arduino = id_arduino;
  }
}
