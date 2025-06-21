import { Component } from '@angular/core';
import { RoutinesFetchService } from '../../services/routines-fetch/routines-fetch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routine-details',
  imports: [],
  templateUrl: './routine-details.component.html',
  styleUrl: './routine-details.component.scss'
})
export class RoutineDetailsComponent {

  constructor( 
    private routineFetchService: RoutinesFetchService,
    private route: ActivatedRoute,
  ) {};

  routineData: any = null;
  id: number | null = null;

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.routineData === null && this.id) {
      try {
        this.routineData = await this.routineFetchService.fetchRoutineDetails(this.id);
      } catch (error) {
        console.error('Error fetching routine information:', error);
      }
    }
    console.log(this.routineData)
  };
}
