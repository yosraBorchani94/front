import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActifModuleComponent } from './actif-module.component';

describe('ActifModuleComponent', () => {
  let component: ActifModuleComponent;
  let fixture: ComponentFixture<ActifModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActifModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActifModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
