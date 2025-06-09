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
    // Injecting ActivatedRoute to access route parameters
    // This allows us to retrieve the pose ID from the URL
    private route: ActivatedRoute,
    private posesFetchService: PosesFetchService
  ) {};
  
  data: any = null;
  id: number | null = null;

  // This method is called when the component is initialized
  // It retrieves the pose ID from the route parameters and fetches the pose data
  // If the data is already available, it uses that instead of fetching again
  // It also handles any errors that may occur during the fetch operation
  // The fetched data is stored in the 'data' property of the component
  async ngOnInit() {
    // Number(this.route.snapshot.paramMap.get('id')) retrieves the 'id' parameter from the URL
    // and converts it to a number. If the parameter is not present, it will be null.
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.data === null && this.id) {
      // Try is tying to fetch pose data using the PosesFetchService
      // If the fetch is successful, the data will be stored in this.data
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
