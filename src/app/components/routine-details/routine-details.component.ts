import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesFetchService } from '../../services/routines-fetch/routines-fetch.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { RoutineDetails } from '../../interfaces/routines.interface';

@Component({
  selector: 'app-routine-details',
  imports: [CommonModule],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.scss'
})
export class RoutineDetailsComponent {

  constructor( 
    private routineFetchService: RoutinesFetchService,
    private route: ActivatedRoute,
  ) {};

  private routineDetailsSubject = new BehaviorSubject<RoutineDetails>({
    data: {
      id: '',
      type: '',
      attributes: {
        name: '',
        description: '',
        difficulty: '',
        routine_poses: []
      }
    }
  });
  public routineDetails$ = this.routineDetailsSubject.asObservable();

  routineData: RoutineDetails = {
    data: {
      id: '',
      type: '',
      attributes: {
        name: '',
        description: '',
        difficulty: '',
        routine_poses: []
      }
    }
  };
  id: number | null = null;

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.routineFetchService.getOneRoutine(this.id).subscribe({
      next: routine => {
        this.routineDetailsSubject.next(routine);
      },
      error: e => {
        console.error('Error fetching routine details', e)
      }
    })
  };
}
