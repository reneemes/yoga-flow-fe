import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

@Component({
  selector: 'app-header',
  imports: [],
  // templateUrl: './header.component.html',
  template: `
    <div class="nav-wrapper">
      <nav class="nav-bar">
        <a href="/home" class="title">YogaFlow</a>
        <div class="buttons">
          <a href="#" class="poses-but">Poses</a>
          <a href="#" class="routine-but">Routines</a>
          <a href="#" class="account-but">Account</a>
        </div>
      </nav>
    </div>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // <h1 class="title" (click)="handleHomeNav()">YogaFlow</h1>
  // constructor(private router: Router) {}

  // handleHomeNav() {
  //   this.router.navigate(['home']);
  // }
  // constructor(
  //   private accountCircleIcon: AccountCircleIcon, 
  //   // private domSanitizer: DomSanitizer
  // ) { 
  //   this.accountCircleIcon.addSvgIcon('home', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/home.svg'));
  //   // Add other icons in the same way
  // }
}
