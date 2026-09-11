import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserLogin } from '../../../core/models/auth.model';


@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    private fb = inject(FormBuilder)
    private authService = inject(AuthService)
    private router = inject(Router)

    

    errorMessage = signal<string | null>(null)
    hidePassword = true

    loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })

    onSubmit(): void {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched()
        return
      }

      this.errorMessage.set(null)

      const formValues = this.loginForm.getRawValue()

      const payload: UserLogin = {
        ...formValues
      }

      this.authService.login(payload).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.errorMessage.set(err.error?.detail || "Une erreur est survenue, veuillez réessayer ultérieurement.")
        }
      })
    }


}
