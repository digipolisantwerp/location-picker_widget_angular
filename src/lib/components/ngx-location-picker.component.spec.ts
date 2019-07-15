import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLocationPickerComponent } from './ngx-location-picker.component';

describe('NgxLocationPickerComponent', () => {
  let component: NgxLocationPickerComponent;
  let fixture: ComponentFixture<NgxLocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxLocationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
