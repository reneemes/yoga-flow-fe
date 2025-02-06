import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

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
  imports: [],
  templateUrl: './poses.component.html',
  styleUrl: './poses.component.scss'
})
export class PosesComponent {
  constructor(private userService: UserService) {}
  data: any = null;

  ngOnInit() {
    this.fetchPoses();
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
  };
}
