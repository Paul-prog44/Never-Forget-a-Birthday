import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser;

  ngOnInit(): void {

    if (!this.user() && this.authService.isLoggedIn()) {
      this.authService.getUserProfile().subscribe({
        error: () => this.onLogout()
      })
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}