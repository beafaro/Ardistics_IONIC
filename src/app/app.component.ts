import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Arduinos', url: '/home/arduinos', icon: 'reader' },
    { title: 'Gestionar arduinos', url: '/gestion-arduino/arduinos', icon: 'cog' },
    { title: 'Estadísticas', url: '/estadisticas', icon: 'stats-chart' }
  ];
  constructor() {}
}
