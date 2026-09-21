import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router'
import { FriendService } from '../../../core/services/friend.service';
import { FriendCreate } from '../../../core/models/friend.model';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-friend-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatListModule
  ],
  templateUrl: './friend-dashboard.html',
  styleUrl: './friend-dashboard.css'
})
export class FriendDashboard {
  private fb = inject(FormBuilder)
  private friendService = inject(FriendService)
  private router = inject(Router)

  friends = this.friendService.friends;

  friendForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    date_of_birth: ['', [Validators.required]]
  })

  ngOnInit(): void {
    // Charge la liste des amis au chargement de la page
    this.friendService.getFriends().subscribe();
  }

  onSubmit(): void {
    if (this.friendForm.valid) {

      const formData = this.friendForm.getRawValue() as FriendCreate
      const dateObj = new Date(formData.date_of_birth)
      const formattedDate = dateObj.toISOString().split('T')[0]

      const payload: FriendCreate = {
      ...formData,
      date_of_birth: formattedDate,
    }

      this.friendService.createFriend(payload).subscribe({
        next: () => {
          this.router.navigate(['/friends'])
        },
        error: (err) => {
          console.error('Erreur lors de la création :', err)
        }
      })
    }
  }

  onDelete(id: number): void {
    this.friendService.deleteFriend(id).subscribe({
      error: (err) => console.error('Erreur lors de la suppression :', err)
    });
  }
}