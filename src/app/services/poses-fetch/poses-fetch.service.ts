import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pose {
  data: {
    id: number;
    type: string;
    attributes: {
      name: string;
      sanskrit_name: string;
      image_url: string
    }
  }
}
export interface PoseDetails {
  data: {
    id: number;
    type: string;
    attributes: {
      name: string;
      sanskrit_name: string;
      pose_description: string;
      pose_benefits: string;
      translation_name: string;
      image_url: string
    }
  }
}

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