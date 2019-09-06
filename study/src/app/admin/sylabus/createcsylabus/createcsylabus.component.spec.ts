import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecsylabusComponent } from './createcsylabus.component';

describe('CreatecsylabusComponent', () => {
  let component: CreatecsylabusComponent;
  let fixture: ComponentFixture<CreatecsylabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecsylabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecsylabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
