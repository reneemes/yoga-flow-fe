import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';

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

  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    // console.log(this.userInfo, "userInfo")
    if (!this.userInfo) {
      console.log("No user data found. Redirecting to login...");
      // Handle no user data (optional: redirect to login)
    }
  }
}
