import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin = true;
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    if (this.isLogin) {
      console.log('Login:', { email: this.email, password: this.password });
      alert('Login functionality - add your backend logic here!');
    } else {
      console.log('Sign up:', { name: this.name, email: this.email, password: this.password });
      alert('Sign up functionality - add your backend logic here!');
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
