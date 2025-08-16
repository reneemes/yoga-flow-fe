import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { login } from '../state/auth/auth.actions';
import { AuthState } from '../state/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { User, SessionResponse } from '../interfaces/user.interface'

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
    private store: Store<AuthState>,
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
    return this.httpClient.post<SessionResponse>('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/sessions', loginData)
    // return this.httpClient.post<SessionResponse>('http://localhost:3000/api/v1/sessions', loginData)
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
          const name = response.user.data.attributes.name;
          this.store.dispatch(login({ token: token, name: name }));
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
