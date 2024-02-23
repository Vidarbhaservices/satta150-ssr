import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatkaJodiListComponent } from './matka-jodi-list.component';

describe('MatkaJodiListComponent', () => {
  let component: MatkaJodiListComponent;
  let fixture: ComponentFixture<MatkaJodiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatkaJodiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatkaJodiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
