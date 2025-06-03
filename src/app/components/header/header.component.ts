import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="nav-wrapper">
      <nav class="nav-bar">
        <a href="/" class="title">YogaFlow</a>
        <div class="buttons">
          <a href="/poses" class="poses-but">Poses</a>
          <a href="/routines" class="routine-but">Routines</a>
        </div>
        <div class="mobile-buttons">
          <a href="/poses" class="poses-but">Poses</a>
          <a href="/routines" class="routine-but">Routines</a>
        </div>
      </nav>
    </div>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

}
