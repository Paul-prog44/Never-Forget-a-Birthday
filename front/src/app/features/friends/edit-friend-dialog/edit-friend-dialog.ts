import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FriendResponse, FriendCreate } from '../../../core/models/friend.model';

@Component({
  selector: 'app-edit-friend-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './edit-friend-dialog.html',
  styleUrl: './edit-friend-dialog.css',
})
export class EditFriendDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditFriendDialog>);
  
  // Récupération des données passées à la modale
  public data: FriendResponse = inject(MAT_DIALOG_DATA);

  // Pré-remplissage du formulaire avec les données actuelles de l'ami
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

      const updatedPayload: FriendCreate = {
        firstname: rawValue.firstname!,
        lastname: rawValue.lastname!,
        email: rawValue.email!,
        date_of_birth: `${year}-${month}-${day}`
      };

      // On renvoie les données modifiées au composant parent lors de la fermeture
      this.dialogRef.close(updatedPayload);
    }
  }
}
