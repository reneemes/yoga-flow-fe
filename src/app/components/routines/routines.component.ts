import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutinesFetchService } from '../../services/routines-fetch/routines-fetch.service';
import { BehaviorSubject } from 'rxjs';

import { Routine } from '../../interfaces/routines.interface';

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

  private routineSubject = new BehaviorSubject<Routine>({ data: [] });
  public routines$ = this.routineSubject.asObservable();

  allRoutines: Routine = { data: []};
  routineSearch: string = "";
  filterMenuOpen = false;

  async ngOnInit() {
    this.routineFetchService.getRoutines().subscribe({
      next: routines => {
        this.allRoutines = routines;
        this.routineSubject.next(routines);
      },
      error: e => {
        console.error('Error fetching routines', e)
      }
    });
  };

  searchRoutines(event: any) {
    if (this.routineSearch.trim() === "") {
      this.routineSubject.next(this.allRoutines);
    } else {
      const filtered = this.allRoutines?.data.filter((routine: any) => {
        const routineName = routine.attributes.name.toLowerCase();
        const difficulty = routine.attributes.difficulty.toLowerCase();

        return (
          routineName.includes(this.routineSearch.toLowerCase()) ||
          difficulty.includes(this.routineSearch.toLowerCase())
        )
      });
      this.routineSubject.next({ data: filtered });
    }
  };

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
  ];

  filterByDifficulty() {
    // return early if routineData is null
    // if (this.routineData === null) return;

    // creates an array of selected difficulties based on the filterOptions
    const selectedDifficulties = this.filterOptions
      .filter(option => option.isChecked)
      .map(option => option.difficulty.toLowerCase());

      console.log('Selected difficulties:', selectedDifficulties);

    // if no difficulties are selected, show all routines
    if (selectedDifficulties.length === 0) {
      this.routineSubject.next(this.allRoutines);
      console.log('No filters applied, showing all routines.');
    } else {
      // else look for routines to fin the ones that match the selected difficulties
      const filtered = this.allRoutines?.data.filter((routine: any) => {
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
      this.routineSubject.next({ data: filtered });
    }
  };

  handleRoutineClick(id: string) {
    this.router.navigate([`routines/${id}`]);
  };
}
