import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirmPassword.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export default class ResetComponent {
  fb = inject(FormBuilder)
  resetForm !: FormGroup;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService)

  token!: string;
  
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator : confirmPasswordValidator('password', 'confirmPassword')
    });
    this.activatedRoute.params.subscribe(value=> {
      this.token = value['token']
      console.log(this.token)
    })
  }
  
  
  resetPassword(){
    console.log(this.resetForm.value)
    let resetObj = {
      token : this.token,
      password : this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['/login'])
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }
}
