import { TestBed } from '@angular/core/testing';

import { PosesFetchService } from './poses-fetch.service';

describe('PosesFetchService', () => {
  let service: PosesFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosesFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
