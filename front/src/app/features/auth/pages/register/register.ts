import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserCreate } from '../../../../core/models/auth.model';
import { MatDatepickerModule } from '@angular/material/datepicker'; // <-- Requis

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  errorMessage: string | null = null
  hidePassword = true

  registerForm = this.fb.nonNullable.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    date_of_birth: [null as Date | null],
    role_id: [1]
  })

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }

    const formValues = this.registerForm.getRawValue()

    let formattedDate: string | null = null
    if (formValues.date_of_birth) {
      const d = new Date (formValues.date_of_birth)
      formattedDate = d.toISOString().split('T')[0]
    }

    const payload: UserCreate = {
      ...formValues,
      date_of_birth: formattedDate
    }

    this.authService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || "Une erreur est survenue, veuillez réessayer ultérieurement."
      }
    })
  }
}
