import { ComponentFixture, TestBed } from '@angular/core/testing';

import { All220CardsComponent } from './all-220-cards.component';

describe('All220CardsComponent', () => {
  let component: All220CardsComponent;
  let fixture: ComponentFixture<All220CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [All220CardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(All220CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
