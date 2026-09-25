import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserResponse, UserUpdate } from '../../../core/models/auth.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CommonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit-profile-dialog.html',
  styleUrl: './edit-profile-dialog.css',
})
export class EditProfileDialog {
private fb = inject(FormBuilder)
private dialogRef = inject(MatDialogRef<EditProfileDialog>)

public data: UserResponse = inject(MAT_DIALOG_DATA)

  editForm = this.fb.group({
    firstname: [this.data.firstname, [Validators.required]],
    lastname: [this.data.lastname, [Validators.required]],
    email: [this.data.email, [Validators.required, Validators.email]],
    date_of_birth: [new Date(this.data.date_of_birth), [Validators.required]]
  });

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.editForm.valid) {
       const rawValue = this.editForm.getRawValue();
            const dateObj = new Date(rawValue.date_of_birth!);
            
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
      
            const updatedPayload: UserUpdate = {
              firstname: rawValue.firstname!,
              lastname: rawValue.lastname!,
              email: rawValue.email!,
              date_of_birth: `${year}-${month}-${day}`
            };
            
            this.dialogRef.close(updatedPayload);
    }
  }

}
