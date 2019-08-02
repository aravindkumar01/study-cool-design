import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsylabusComponent } from './addsylabus.component';

describe('AddsylabusComponent', () => {
  let component: AddsylabusComponent;
  let fixture: ComponentFixture<AddsylabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsylabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsylabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
