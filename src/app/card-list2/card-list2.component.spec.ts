import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardList2Component } from './card-list2.component';

describe('CardList2Component', () => {
  let component: CardList2Component;
  let fixture: ComponentFixture<CardList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardList2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
