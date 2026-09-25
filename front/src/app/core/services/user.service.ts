import { Injectable, inject, signal } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from "rxjs"
import { environment } from "../../../environments/environment"
import {
    UserResponse,
    UserUpdate,

} from '../models/auth.model'
import { AuthService } from "./auth.service"

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/users`
    private authService = inject(AuthService)
  
  currentUser = this.authService.currentUser

  
  updateProfile(userUpdate: UserUpdate): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/update`, userUpdate).pipe(
      tap(user => { this.currentUser.set(user)})
    )
  }
}