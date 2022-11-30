import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ardistics',
  templateUrl: './ardistics.page.html',
  styleUrls: ['./ardistics.page.scss'],
})
export class ArdisticsPage implements OnInit {
  public ardistics!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ardistics = "Ardistics";
  }

}
