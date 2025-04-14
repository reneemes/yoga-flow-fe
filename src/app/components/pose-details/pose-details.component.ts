import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pose-details',
  imports: [],
  templateUrl: './pose-details.component.html',
  styleUrl: './pose-details.component.scss'
})
export class PoseDetailsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {};
  
  data: any = null;
  id: number | null = null;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id, "<> ID"); // Use this to fetch pose data or whatever you need
    if (this.data === null) {
      this.fetchPoseData(this.id);
    }
  }; 

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
    console.log(json, "POSE");
    this.data = json;
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
