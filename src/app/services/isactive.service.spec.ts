import { TestBed } from '@angular/core/testing';

import { IsactiveService } from './isactive.service';

describe('IsactiveService', () => {
  let service: IsactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
