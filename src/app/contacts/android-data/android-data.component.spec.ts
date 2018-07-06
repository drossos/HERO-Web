import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidDataComponent } from './android-data.component';

describe('AndroidDataComponent', () => {
  let component: AndroidDataComponent;
  let fixture: ComponentFixture<AndroidDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
