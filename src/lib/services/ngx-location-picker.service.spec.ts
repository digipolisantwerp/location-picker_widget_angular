import { TestBed } from '@angular/core/testing';

import { NgxLocationPickerService } from './ngx-location-picker.service';

describe('NgxLocationPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxLocationPickerService = TestBed.get(NgxLocationPickerService);
    expect(service).toBeTruthy();
  });
});
