import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

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
// interface Routine {
//   data: {
//     id: number,
//     type: string,
//     attributes: {
//       name: string,
//       description: string,
//       difficulty: string,
//       routine_poses: Pose[]
//     }
//   }
// }
interface User {
  token: string,
  user: {
    data: {
      id: number,
      attributes: {
        name: string,
        email: string
      }
    }
  }
}

@Component({
  selector: 'app-routines',
  imports: [],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent {
  constructor(
    private userService: UserService
  ) {};

  data: any = null;
  // id: string | null = null;
  userInfo: User | null = null;

  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    if (!this.userInfo) {
      console.log("No user data found. Redirecting to login...");
      // Handle no user data (optional: redirect to login)
    }
  }

  async fetchRoutines() {
    if (!this.userInfo) {
      console.error('User is not authenticated.');
      return;
    }

    const url = "http://localhost:3000/api/v1/routines";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": this.userInfo.token
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

    const json = await response.json();
    console.log(json, "ROUTINES");
    this.data = json;
    // this.allData = json;
  };
}
