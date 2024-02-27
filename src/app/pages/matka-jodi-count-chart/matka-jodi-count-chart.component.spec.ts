import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatkaJodiCountChartComponent } from './matka-jodi-count-chart.component';

describe('MatkaJodiCountChartComponent', () => {
  let component: MatkaJodiCountChartComponent;
  let fixture: ComponentFixture<MatkaJodiCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatkaJodiCountChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatkaJodiCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
