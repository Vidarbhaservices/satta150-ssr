import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JodiPanelComponent } from './jodi-panel.component';

describe('JodiPanelComponent', () => {
  let component: JodiPanelComponent;
  let fixture: ComponentFixture<JodiPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JodiPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JodiPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
