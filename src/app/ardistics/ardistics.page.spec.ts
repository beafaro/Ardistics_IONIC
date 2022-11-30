import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ArdisticsPage } from './ardistics.page';

describe('ArdisticsPage', () => {
  let component: ArdisticsPage;
  let fixture: ComponentFixture<ArdisticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArdisticsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ArdisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
