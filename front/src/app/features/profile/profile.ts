import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProfileDialog } from './edit-profile-dialog/edit-profile-dialog';
import { UserUpdate } from '../../core/models/auth.model';
import { UserService } from '../../core/services/user.service';

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
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService)
  private dialog = inject(MatDialog)
  private userService = inject(UserService)


  user = this.authService.currentUser

  ngOnInit(): void {

    if (!this.user() && this.authService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe({
        error: () => this.onLogout()
      })
    }
  }

  onLogout(): void {
    this.authService.logout()
  }

  onEdit(): void {

    const dialogRef = this.dialog.open(EditProfileDialog, {
          width: '400px',
          data: this.user()
        });

    //TODO : Save changes
    dialogRef.afterClosed().subscribe((updatedProfile : UserUpdate | undefined) => {
      if (updatedProfile) {
        this.userService.updateProfile(updatedProfile).subscribe({
          error: (err) => console.log('Erreur lors de la mise à jour du profile', err)
        })
      }
    }
  
    )
  }

  onDelete(): void{
    return
  }
  
}