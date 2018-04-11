import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoesByModuleComponent } from './videoes-by-module.component';

describe('VideoesByModuleComponent', () => {
  let component: VideoesByModuleComponent;
  let fixture: ComponentFixture<VideoesByModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoesByModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoesByModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
