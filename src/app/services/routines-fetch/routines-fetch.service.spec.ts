import { TestBed } from '@angular/core/testing';

import { RoutinesFetchService } from './routines-fetch.service';

describe('RoutinesFetchService', () => {
  let service: RoutinesFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutinesFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
