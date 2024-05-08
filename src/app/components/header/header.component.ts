import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService)
  isLoggedIn : boolean = false;
  router = inject(Router)
  
  ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe(res=> {
    this.isLoggedIn = this.authService.isLoggedIn();
  })
  }

  logout(){
    localStorage.removeItem("user_id")
    this.router.navigate(['/login'])
    this.authService.isLoggedIn$.next(false);
  }
}
