import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-pose-details',
  imports: [CommonModule],
  templateUrl: './pose-details.component.html',
  styleUrl: './pose-details.component.scss'
})
export class PoseDetailsComponent {
  constructor(
    private router: Router,
    // Injecting ActivatedRoute to access route parameters
    // This allows us to retrieve the pose ID from the URL
    private route: ActivatedRoute,
    private posesFetchService: PosesFetchService
  ) {};
  
  private poseSubject = new BehaviorSubject<PoseDetails | null>(null);
  public pose$ = this.poseSubject.asObservable();
  id: number = 0;

  async ngOnInit() {
    // retrieves the 'id' parameter from the URL and converts it to a number
    // if the parameter is not present, it will be 0
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.posesFetchService.getOnePose(this.id).subscribe({
      next: pose => {
        this.poseSubject.next(pose);
      },
      error: e => {
        console.error('Error fetching pose details', e)
      }
    })
  }

  formatName(name: string): string {
    if (name.toLowerCase().includes("pose")) {
      return name;
    } else {
      return `${name} Pose`;
    }
  }
};
