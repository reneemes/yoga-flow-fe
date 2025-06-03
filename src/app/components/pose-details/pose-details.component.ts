import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';

@Component({
  selector: 'app-pose-details',
  imports: [],
  templateUrl: './pose-details.component.html',
  styleUrl: './pose-details.component.scss'
})
export class PoseDetailsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private posesFetchService: PosesFetchService
  ) {};
  
  data: any = null;
  id: number | null = null;

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id, "<> ID");
    if (this.data === null && this.id) {
      try {
        this.data = await this.posesFetchService.fetchPoseData(this.id);
      } catch (error) {
        console.error('Error fetching pose:', error);
      }
    }
  }; 

  formatName(): string {
    const name = this.data?.data?.attributes?.name || '';
  
    if (name.toLowerCase().includes("pose")) {
      return name;
    } else {
      return `${name} Pose`;
    }
  }
}
