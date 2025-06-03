import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutinesFetchService {

  constructor() { }

  async fetchRoutines() {
    const url = "http://localhost:3000/api/v1/routines";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // "Authorization": this.userInfo.token
      }
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    };

    const json = await response.json();
    return json;
    //   console.log(json, "ROUTINES");
    //   this.routineData = json.data;
    //   // this.allData = json;
    //   console.log("Fetched Data: ", this.routineData)
  
    };
}
