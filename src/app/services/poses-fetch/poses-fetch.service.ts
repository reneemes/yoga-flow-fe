import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosesFetchService {

  constructor() { }

  // GET All Poses
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
    // this.data = json;
    // this.allData = json;
    return json;
  }

  // GET One Pose
  async fetchPoseData(id: number) {
    const url = `http://localhost:3000/api/v1/poses/${id}`;
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
    // console.log(json, "POSE");
    // this.data = json;
    return json;
  }
}
