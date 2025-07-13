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

  getRoutines(): Observable<RoutineResponse> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTI1MTM0MTh9.gkZTBIVUcQvGG36x-4NTqbQ4LD51RBXx76PrQlJd2HU';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<RoutineResponse>('http://localhost:3000/api/v1/routines', { headers });
  };

  getOneRoutine(id: number): Observable<RoutineDetails> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NTI1MTM0MTh9.gkZTBIVUcQvGG36x-4NTqbQ4LD51RBXx76PrQlJd2HU';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<RoutineDetails>(`http://localhost:3000/api/v1/routines/${id}`, { headers });
  };
}
