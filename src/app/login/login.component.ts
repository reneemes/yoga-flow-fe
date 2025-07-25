import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  constructor(private router: Router) {}
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

  async submitLogin(form: NgForm) {
    if(form.valid) {
      const url = "http://localhost:3000/api/v1/sessions";
      const loginData = {
        email: this.user.email,
        password: this.user.password
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(loginData)
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        console.log(json.token);
        this.router.navigate(['home']);
      } catch (error: any) {
        console.error(error.message);
        alert("Invalid login credentials");
      }
    }
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(this.user.email);
  }
}
