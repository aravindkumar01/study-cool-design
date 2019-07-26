import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunivercityComponent } from './addunivercity.component';

describe('AddunivercityComponent', () => {
  let component: AddunivercityComponent;
  let fixture: ComponentFixture<AddunivercityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddunivercityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddunivercityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
