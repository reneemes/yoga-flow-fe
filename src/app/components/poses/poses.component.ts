import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

interface Pose {
  data: {
    id: number,
    type: string,
    attributes: {
      name: string,
      sanskrit_name: string,
      image_url: string
    }
  }
}

@Component({
  selector: 'app-poses',
  imports: [],
  templateUrl: './poses.component.html',
  styleUrl: './poses.component.scss'
})
export class PosesComponent {
  constructor(private router: Router, private userService: UserService) {}
  data: any = null;
  allData: any = null;
  movieSearch: string = "";

  ngOnInit() {
    if (this.data === null) {
      this.fetchPoses();
    }
  };

  async fetchPoses() {
    const url = "http://localhost:3000/api/v1/poses";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

    const json = await response.json();
    console.log(json, "POSES");
    this.data = json;
    this.allData = json;
  };

  searchPoses(event: any) {
    if (this.movieSearch.trim() === "") {
      this.data = this.allData; // Reset to original data when search is empty
    } else {
      this.data = this.allData.filter((pose: any) =>
        pose.data.attributes.name.toLowerCase().includes(this.movieSearch.toLowerCase())
      );
    }
    // let search = event.target.value;
    // this.movieSearch = search
    // if (search !== "") {
    //   const filteredPoses = this.data.filter(pose: any => {
    //     return pose.data.attributes.name.toLowerCase().includes(search.toLowerCase())
    //   })
    //   return filteredPoses
    // }
  }

  handlePoseClick(id: number) {
    this.router.navigate([`poses/${id}`]);
  };
}
