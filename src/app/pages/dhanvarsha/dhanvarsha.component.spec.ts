import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhanvarshaComponent } from './dhanvarsha.component';

describe('DhanvarshaComponent', () => {
  let component: DhanvarshaComponent;
  let fixture: ComponentFixture<DhanvarshaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DhanvarshaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DhanvarshaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
