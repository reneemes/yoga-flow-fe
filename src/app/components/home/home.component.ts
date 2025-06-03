import { Component } from '@angular/core';

interface User {
  token: string,
  user: {
    data: {
      id: number,
      attributes: {
        name: string,
        email: string
      }
    }
  }
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userInfo: User | null = null;

  constructor() {}
  
  ngOnInit() {
    if (!this.userInfo) {
      console.log("No user data found. Redirecting to login...");
    }
  }
}
