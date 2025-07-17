import { Component } from '@angular/core';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

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

@Component({
  selector: 'app-poses',
  imports: [FormsModule, CommonModule],
  templateUrl: './poses.component.html',
  styleUrl: './poses.component.scss'
})
export class PosesComponent {
  constructor(
    private router: Router,
    private posesFetchService: PosesFetchService,
  ) {};
  
  private posesSubject = new BehaviorSubject<Pose[]>([]);
  public poses$ = this.posesSubject.asObservable();

  allData: Pose[] = [];
  poseSearch: string = '';

  async ngOnInit() {
    this.posesFetchService.getPoses().subscribe({
      next: poses => {
        this.allData = poses;
        this.posesSubject.next(poses);
      },
      error: e => {
        console.error('Error fetching poses', e);
      }
    });
  };

  searchPoses(event: any) {
    if (this.poseSearch.trim() === '') {
      this.posesSubject.next(this.allData);
    } else {
      const filtered = this.allData.filter((pose: any) => {
        const poseName = pose.data.attributes.name.toLowerCase();
        const sanskritName = pose.data.attributes.sanskrit_name.toLowerCase();

        return (
          poseName.includes(this.poseSearch.toLowerCase()) ||
          sanskritName.includes(this.poseSearch.toLowerCase())
        );
      });
      this.posesSubject.next(filtered);
    }
  }

  handlePoseClick(id: number) {
    this.router.navigate([`poses/${id}`]);
  };
}
