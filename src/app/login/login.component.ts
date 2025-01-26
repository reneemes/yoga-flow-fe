import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface User {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = "Login";

  user: User = {
    email: '',
    password: ''
  };

  submitForm(form: NgForm) {
    if(form.valid) {
      console.log(form.value, this.user);
      // fetch to BE for login user
    }
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(this.user.email);
  }
}
