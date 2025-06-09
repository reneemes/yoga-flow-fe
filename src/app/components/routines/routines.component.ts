import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-routines',
  imports: [CommonModule, FormsModule],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent {
  constructor(
    private routineFetchService: RoutinesFetchService
  ) {};

  routineData: Routine[] | null = null;
  allRoutines: any = null;
  routineSearch: string = "";
  filterMenuOpen = false;

  async ngOnInit() {
    if (this.routineData === null) {
      try {
        const response = await this.routineFetchService.fetchRoutines();
        this.routineData = response.data;
        this.allRoutines = response.data;
        console.log('Routines fetched successfully:', this.routineData);
      } catch (error) {
        console.error('Error fetching poses:', error);
      }
    }
  }

  searchRoutines(event: any) {
    if (this.routineSearch.trim() === "") {
      this.routineData = this.allRoutines;
    } else {
      this.routineData = this.allRoutines.filter((routine: any) => {
        const routineName = routine.attributes.name.toLowerCase();
        const difficulty = routine.attributes.difficulty.toLowerCase();

        return (
          routineName.includes(this.routineSearch.toLowerCase()) ||
          difficulty.includes(this.routineSearch.toLowerCase())
        )
      });
    }
  }

  toggleFilterMenu() {
    this.filterMenuOpen = !this.filterMenuOpen;
  };

  // handleRoutineClick(id: number) {
  //   this.router.navigate([`poses/${id}`]);
  // };
}
