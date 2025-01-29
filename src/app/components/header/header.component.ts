import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="nav-wrapper">
      <nav class="nav-bar">
        <a href="/home" class="title">YogaFlow</a>
        <div class="buttons">
          <a href="/poses" class="poses-but">Poses</a>
          <a href="/routines" class="routine-but">Routines</a>
          <svg (click)="handleAccountNav()" xmlns="http://www.w3.org/2000/svg"height="48px"viewBox="0 -960 960 960" width="48px" fill="#f1dcd9"><path d="M226-266q62-39 122.5-58T480-343q71 0 133 20t122 57q42-55 59-105.46 17-50.45 17-108.54 0-140.25-95.33-235.62Q620.35-811 480.17-811 340-811 244.5-715.62 149-620.25 149-480q0 58 17.03 108.22Q183.05-321.57 226-266Zm253.81-177q-60.97 0-101.89-41.19Q337-525.37 337-585.69q0-60.31 41.11-101.81 41.1-41.5 102.08-41.5 60.97 0 101.89 41.69 40.92 41.68 40.92 102Q623-525 581.89-484q-41.1 41-102.08 41Zm-.21 388q-87.15 0-164.9-33.28-77.75-33.29-135.82-91.56-58.07-58.27-90.98-135.44Q55-392.46 55-480.39t33.5-165.27Q122-723 180-780.5T315.25-872q77.24-34 165.25-34t165.25 34Q723-838 780.5-780.5T872-645.59q34 77.4 34 165.32 0 87.93-34 165.1Q838-238 780.5-180 723-122 645.46-88.5 567.93-55 479.6-55Z"/></svg>
        </div>
      </nav>
    </div>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  handleAccountNav() {
    this.router.navigate(['account']);
  }
}
