import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogRef, MatDialogModule} from '@angular/material/dialog'

@Component({
  selector: 'app-delete-friend-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-friend-dialog.html',
  styleUrl: './delete-friend-dialog.css',
})
export class DeleteFriendDialog {
    private dialogRef = inject(MatDialogRef<DeleteFriendDialog>);


  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true)
  }
}
