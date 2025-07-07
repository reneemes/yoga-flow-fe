import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
    <div class="nav-wrapper">
      <nav class="nav-bar">
        <a routerLink="/" class="title">YogaFlow</a>
        <div class="buttons">
          <a routerLink="/poses" class="poses-button">Poses</a>
          <a routerLink="/routines" class="routines-button">Routines</a>
        </div>
        <div class="mobile-buttons">
          <a routerLink="/poses" class="poses-b">Poses</a>
          <a routerLink="/routines" class="routines-b">Routines</a>
        </div>
      </nav>
    </div>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private routerModule: RouterModule) {}

}
