import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectToken } from '../../../store/auth/auth.selectors';

export interface Pose {
  pose_id: number;
  name: string;
  sanskrit_name: string;
  image_url: string;
  description: string;
  translation_name: string;
  pose_benefits: string;
}

export interface RoutineAttributes {
  name: string;
  description: string;
  difficulty: string;
  routine_poses: Pose[];
}

export interface RoutineItem {
  id: string;
  type: string;
  attributes: RoutineAttributes;
}

export interface RoutineResponse {
  data: RoutineItem[];
}

export interface RoutineDetails {
  data: RoutineItem;
}

@Injectable({
  providedIn: 'root'
})
export class RoutinesFetchService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    // this.store.select(selectToken).subscribe(token => console.log(token));
    this.store.select(selectToken).subscribe(token => {
      this.token = token;
    });
  }
  token: string | null = '';
  // token$: Observable<string | null> = this.store.select(selectToken);
  // token$: Observable<string | null> = of(''); // Initialize with an empty string observable
  // this.store.select(selectToken).subscribe(token => {
  //   // use token
  // });

  getRoutines(): Observable<RoutineResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.httpClient.get<RoutineResponse>('http://localhost:3000/api/v1/routines', { headers });
  };

  getOneRoutine(id: number): Observable<RoutineDetails> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.httpClient.get<RoutineDetails>(`http://localhost:3000/api/v1/routines/${id}`, { headers });
  };
}
