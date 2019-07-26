import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SylabusComponent } from './sylabus.component';

describe('SylabusComponent', () => {
  let component: SylabusComponent;
  let fixture: ComponentFixture<SylabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SylabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SylabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
