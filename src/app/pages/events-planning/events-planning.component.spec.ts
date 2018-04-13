import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPlanningComponent } from './events-planning.component';

describe('EventsPlanningComponent', () => {
  let component: EventsPlanningComponent;
  let fixture: ComponentFixture<EventsPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
