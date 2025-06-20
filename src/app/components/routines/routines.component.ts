import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
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

  // two-way data binding for the filter options
  // using ngModel in the HTML allows us to bind the checkbox state to isChecked
  // so we can easily check which difficulties are selected
  filterOptions = [
    { difficulty: 'Beginner', isChecked: false },
    { difficulty: 'Intermediate', isChecked: false },
    { difficulty: 'Advanced', isChecked: false }
  ]

  filterByDifficulty() {
    // return early if routineData is null
    if (this.routineData === null) return;

    // creates an array of selected difficulties based on the filterOptions
    const selectedDifficulties = this.filterOptions
      .filter(option => option.isChecked)
      .map(option => option.difficulty.toLowerCase());

      console.log('Selected difficulties:', selectedDifficulties);

    // if no difficulties are selected, show all routines
    if (selectedDifficulties.length === 0) {
      this.routineData = this.allRoutines;
      console.log('No filters applied, showing all routines.');
    } else {
      // else look for routines to fin the ones that match the selected difficulties
      this.routineData = this.allRoutines.filter((routine: any) => {
        console.log('Checking routine:', routine);
        // get the difficulty of each individual routine and convert it to lowercase
        const difficulty = routine.attributes.difficulty.toLowerCase();
        console.log('Routine difficulty:', difficulty);
        console.log('selectedDifficulties:', selectedDifficulties);
        // return routines that match the selected difficulties
        return (
          selectedDifficulties.includes(difficulty)
        )
      })
    }
  }

  handleRoutineClick(id: string) {
    this.router.navigate([`routines/${id}`]);
  };
}
