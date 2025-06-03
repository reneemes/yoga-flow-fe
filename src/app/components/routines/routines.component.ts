import { Component } from '@angular/core';
// import { UserService } from '../../services/poses-fetch/user.service';
import { CommonModule } from '@angular/common';
import { RoutinesFetchService } from '../../services/routines-fetch/routines-fetch.service';

export interface Routine {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    difficulty: string;
    routine_poses: Pose[];
  };
}

export interface Pose {
  pose_id: number;
  name: string;
  sanskrit_name: string;
  translation_name: string;
  description: string;
  pose_benefits: string;
  image_url: string;
}
// interface User {
//   token: string,
//   user: {
//     data: {
//       id: number,
//       attributes: {
//         name: string,
//         email: string
//       }
//     }
//   }
// }

@Component({
  selector: 'app-routines',
  imports: [CommonModule],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent {
  constructor(
    private routineFetchService: RoutinesFetchService
  ) {};

  routineData: Routine[] | null = null;

  async ngOnInit() {
    if (this.routineData === null) {
      try {
        const response = await this.routineFetchService.fetchRoutines();
        this.routineData = response.data;
        // this.allData = response;
      } catch (error) {
        console.error('Error fetching poses:', error);
      }
    // this.userInfo = this.userService.getUserInfo();
    // if (!this.userInfo) {
    //   console.log("No user data found. Redirecting to login...");
    //   // Handle no user data (optional: redirect to login)
    // }
    // console.log("TOKEN", this.userInfo?.token)
    //   if (this.routineData === null) {
    //     this.fetchRoutines();
    //   }
    //   console.log("Fetched Data: ", this.routineData)
    }
  }

  // async fetchRoutines() {
  //   if (!this.userInfo) {
  //     console.error('User is not authenticated.');
  //     return;
  //   }

  //   const url = "http://localhost:3000/api/v1/routines";
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Authorization": this.userInfo.token
  //     }
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   };

  //   const json = await response.json();
  //   console.log(json, "ROUTINES");
    // this.routineData = json.data;
  //   // this.allData = json;
  //   console.log("Fetched Data: ", this.routineData)

  // };
}
