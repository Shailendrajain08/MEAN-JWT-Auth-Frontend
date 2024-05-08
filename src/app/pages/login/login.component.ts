import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit{

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  registerForm !: FormGroup;
  router = inject(Router)

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.registerForm.value).subscribe({
      next: (res) => {
        alert("Login Successful!");
        localStorage.setItem("user_id", res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/home']);
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
