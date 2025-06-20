import { Component } from '@angular/core';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// interface Pose {
//   data: {
//     id: number,
//     type: string,
//     attributes: {
//       name: string,
//       sanskrit_name: string,
//       image_url: string
//     }
//   }
// }

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
  
  data: any = null;
  allData: any = null;
  poseSearch: string = "";
  filterMenuOpen = false;
  id: string | null = null;

  async ngOnInit() {
    if (this.data === null) {
      try {
        const response = await this.posesFetchService.fetchPoses();
        this.data = response;
        this.allData = response;
      } catch (error) {
        console.error('Error fetching poses:', error);
      }
    }
  };

  searchPoses(event: any) {
    if (this.poseSearch.trim() === "") {
      this.data = this.allData;
    } else {
      this.data = this.allData.filter((pose: any) => {
        const poseName = pose.data.attributes.name.toLowerCase();
        const sanskritName = pose.data.attributes.sanskrit_name.toLowerCase();

        return (
          poseName.includes(this.poseSearch.toLowerCase()) ||
          sanskritName.includes(this.poseSearch.toLowerCase())
        )
      });
    }
  }

  // toggleFilterMenu() {
  //   this.filterMenuOpen = !this.filterMenuOpen;
  // };

  handlePoseClick(id: number) {
    this.router.navigate([`poses/${id}`]);
  };
}
