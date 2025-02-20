import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [FormsModule, CommonModule],
  templateUrl: './poses.component.html',
  styleUrl: './poses.component.scss'
})
export class PosesComponent {
  // @ViewChild('filterMenu', { static: false }) filterMenu!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private userService: UserService, private elementRef: ElementRef) {}
  
  data: any = null;
  allData: any = null;
  poseSearch: string = "";
  filterMenuOpen = false;

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
    if (this.poseSearch.trim() === "") {
      this.data = this.allData; // Reset to original data when search is empty
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

  toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  };

  // @HostListener('document:click', ['$event'])
  // onClickOutsideFilterMenu(event: Event) {
  //   // if (!this.elementRef.nativeElement.contains(event.target)) {
  //   //   this.filterMenuOpen = false;
  //   // }
  //   if (
  //     this.filterMenu &&
  //     this.filterMenu.nativeElement &&
  //     !this.filterMenu.nativeElement.contains(event.target)
  //   ) {
  //     this.filterMenuOpen = false;
  //   }
  // };

  handlePoseClick(id: number) {
    this.router.navigate([`poses/${id}`]);
  };
}
