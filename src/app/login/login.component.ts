import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loginSuccess } from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.state'
import { Store } from '@ngrx/store';

interface User {
  email: string;
  password: string
}
interface SessionResponse {
  token: string;
  user: {
    data: {
      id: number;
      type: string;
      attributes: {
        name: string;
        email: string
      }
    }
  }
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>,
  ) {}

  title = "Login";

  user: User = {
    email: '',
    password: ''
  };

  togglePassword() {
    let passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
  }

  loginUser(loginData: User): Observable<SessionResponse> {
    return this.httpClient.post<SessionResponse>('http://localhost:3000/api/v1/sessions', loginData)
  };

  submitLogin(form: NgForm) {
    if(form.valid) {
      const loginData = {
        email: this.user.email,
        password: this.user.password
      }

      this.loginUser(loginData).subscribe({
        next: response => {
          const token = response.token;
          console.log('TOKEN', token);
          this.store.dispatch(loginSuccess({ token }));
          this.router.navigate(['home']);
        },
        error: e => {
          console.error('Error starting user session', e);
        }
      })
    }
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(this.user.email);
  }
}
