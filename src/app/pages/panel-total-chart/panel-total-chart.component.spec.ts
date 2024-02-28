import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTotalChartComponent } from './panel-total-chart.component';

describe('PanelTotalChartComponent', () => {
  let component: PanelTotalChartComponent;
  let fixture: ComponentFixture<PanelTotalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelTotalChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelTotalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
