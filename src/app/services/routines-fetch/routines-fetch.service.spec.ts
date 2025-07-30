import { TestBed } from '@angular/core/testing';
import { RoutinesFetchService } from './routines-fetch.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing'; 
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { mockRoutinesResponse, mockRoutineDetailsResponse } from '../../testing/mock-routines';

describe('RoutinesFetchService', () => {
  let service: RoutinesFetchService;
  let httpMock: HttpTestingController;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockStore.select.and.returnValue(of('user-token'));

    TestBed.configureTestingModule({
      providers: [
        RoutinesFetchService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Store, useValue: mockStore},
      ]
    });
    service = TestBed.inject(RoutinesFetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return yoga routines', () => {
    service.getRoutines().subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.data.length).toBe(2);
      expect(result.data[0].attributes.name).toBe('Advanced Routine');
      expect(result.data[1].attributes.name).toBe('New Routine');
    });

    const req = httpMock.expectOne('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/routines');
    // const req = httpMock.expectOne('http://localhost:3000/api/v1/routines');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer user-token');
    req.flush(mockRoutinesResponse);
    httpMock.verify();
  });

  it('should return details for one yoga routine', () => {
    service.getOneRoutine(2).subscribe(result => {
      expect(result).toBeTruthy();
      console.log('result: ', result)
      expect(result.data.attributes.name).toBe('New Routine');
      expect(result.data.attributes.routine_poses.length).toBe(2);
    });

    const req = httpMock.expectOne('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/routines/2');
    // const req = httpMock.expectOne('http://localhost:3000/api/v1/routines/2');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer user-token');
    req.flush(mockRoutineDetailsResponse);
    httpMock.verify();
  });
});

