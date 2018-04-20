import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastByUserComponent } from './broadcast-by-user.component';

describe('BroadcastByUserComponent', () => {
  let component: BroadcastByUserComponent;
  let fixture: ComponentFixture<BroadcastByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
