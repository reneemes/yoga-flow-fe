import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectToken } from '../../../store/auth/auth.selectors';

import { Routine } from '../../interfaces/routines.interface';
import { RoutineDetails } from '../../interfaces/routines.interface';

@Injectable({
  providedIn: 'root'
})
export class RoutinesFetchService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    this.store.select(selectToken).subscribe(token => {
      this.tokenSubject.next(token);
    });
  }

  private tokenSubject = new BehaviorSubject<string | null>('');

  getRoutines(): Observable<Routine> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenSubject.value}`);

    return this.httpClient.get<Routine>('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/routines', { headers });
    // return this.httpClient.get<Routine>('http://localhost:3000/api/v1/routines', { headers });
  };

  getOneRoutine(id: number): Observable<RoutineDetails> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenSubject.value}`);

    return this.httpClient.get<RoutineDetails>(`https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/routines/${id}`, { headers });
    // return this.httpClient.get<RoutineDetails>(`http://localhost:3000/api/v1/routines/${id}`, { headers });
  };
}
