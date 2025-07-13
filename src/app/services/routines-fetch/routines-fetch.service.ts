import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private httpClient: HttpClient) { }

  // token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTI0Mzg1NjN9.M70A5v6IYLUUJSTmp-KVRpIywbKYvI3QLvaeLem_D48';
  // headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
  // httpHeaders: HttpHeaders = new HttpHeaders({
  //   Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTI0Mzg1NjN9.M70A5v6IYLUUJSTmp-KVRpIywbKYvI3QLvaeLem_D48'
  // })

  getRoutines(): Observable<RoutineResponse> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTI0Mzk3NjZ9.AWmZimkWsr2hyxG8zd-jjRs0W-KosIkgw4ImTqkQGO0';
    // const httpHeaders = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<RoutineResponse>('http://localhost:3000/api/v1/routines', { headers });
  };

  getOneRoutine(id: number): Observable<RoutineDetails> {
    return this.httpClient.get<RoutineDetails>(`http://localhost:3000/api/v1/routines/${id}`);
  };
}
