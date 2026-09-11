import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    private fb = inject(FormBuilder)

    errorMessage: string | null = null
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

    const formValues = this.loginForm.getRawValue()
    console.log(formValues)
    }


}
