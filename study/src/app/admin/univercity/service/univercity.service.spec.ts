import { TestBed } from '@angular/core/testing';

import { UnivercityService } from './univercity.service';

describe('UnivercityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnivercityService = TestBed.get(UnivercityService);
    expect(service).toBeTruthy();
  });
});
