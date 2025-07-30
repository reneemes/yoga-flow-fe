import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pose } from '../../interfaces/poses.interface';
import { PoseDetails } from '../../interfaces/poses.interface';

@Injectable({
  providedIn: 'root'
})
export class PosesFetchService {
  constructor(private httpClient: HttpClient) { }

  getPoses(): Observable<Pose[]> {
    return this.httpClient.get<Pose[]>('http://localhost:3000/api/v1/poses');
  };

  getOnePose(id: number): Observable<PoseDetails> {
    return this.httpClient.get<PoseDetails>(`http://localhost:3000/api/v1/poses/${id}`);
  };
}