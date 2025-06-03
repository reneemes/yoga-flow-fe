import { Component } from '@angular/core';
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
      } catch (error) {
        console.error('Error fetching poses:', error);
      }
    }
  }
}
