import { TestBed } from '@angular/core/testing';

import { SylabusService } from './sylabus.service';

describe('SylabusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SylabusService = TestBed.get(SylabusService);
    expect(service).toBeTruthy();
  });
});
