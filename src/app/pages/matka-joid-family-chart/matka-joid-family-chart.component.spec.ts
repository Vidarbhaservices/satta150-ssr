import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatkaJoidFamilyChartComponent } from './matka-joid-family-chart.component';

describe('MatkaJoidFamilyChartComponent', () => {
  let component: MatkaJoidFamilyChartComponent;
  let fixture: ComponentFixture<MatkaJoidFamilyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatkaJoidFamilyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatkaJoidFamilyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
