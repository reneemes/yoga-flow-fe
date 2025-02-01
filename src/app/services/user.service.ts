import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userInfoSubject = new BehaviorSubject<any>(null);
  // private userInfoSubject = new BehaviorSubject<User | null>(this.getStoredUserInfo());
  // userInfo = this.userInfoSubject.asObservable();

  constructor() {}

   // Store user info in localStorage
   setUserInfo(info: User): void {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  // Retrieve user info from localStorage
  getUserInfo(): User | null {
    const storedUser = localStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Clear user info (for logout)
  clearUserInfo(): void {
    localStorage.removeItem('userInfo');
  }

  // Store user info in BehaviorSubject AND localStorage
  // setUserInfo(info: User): void {
  //   this.userInfoSubject.next(info);
  //   localStorage.setItem('userInfo', JSON.stringify(info));  // Save to localStorage
  //   console.log(info.user.data.attributes.name, "INFO HERE")
  // }

  // // Retrieve user info from BehaviorSubject OR localStorage
  // getUserInfo(): User | null {
  //   return this.userInfoSubject.value;
  // }

  // // Get user info from localStorage if it exists
  //  private getStoredUserInfo(): User | null {
  //   const storedUser = localStorage.getItem('userInfo');
  //   return storedUser ? JSON.parse(storedUser) : null;
  // }

  // // Clear user info (for logout)
  // clearUserInfo(): void {
  //   this.userInfoSubject.next(null);
  //   localStorage.removeItem('userInfo'); // Remove from localStorage
  // }
}
