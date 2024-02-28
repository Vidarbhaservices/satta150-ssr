import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCountChartComponent } from './panel-count-chart.component';

describe('PanelCountChartComponent', () => {
  let component: PanelCountChartComponent;
  let fixture: ComponentFixture<PanelCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelCountChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
