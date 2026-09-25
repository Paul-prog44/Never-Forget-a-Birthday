import { Injectable, inject, signal } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from "rxjs"
import { environment } from "../../../environments/environment"
import {
    UserCreate,
    UserLogin,
    UserRegisterResponse,
    UserResponse,
    UserUpdate
} from '../models/auth.model'
import { Router } from "@angular/router"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/auth`
  private router = inject(Router)


  currentUser = signal<UserResponse |null>(null)

  login(credentials: UserLogin): Observable<UserRegisterResponse>{
      return this.http.post<UserRegisterResponse>(`${this.apiUrl}/login`, credentials).pipe(
          tap(response => {
          this.saveToken(response.token.access_token)
          this.currentUser.set(response.user)

      }))
  }

  register(userData: UserCreate): Observable<UserRegisterResponse> {
      return this.http.post<UserRegisterResponse>(`${this.apiUrl}/register`, userData).pipe(
          tap(response => {
          this.saveToken(response.token.access_token)
          this.currentUser.set(response.user)
          }) 
      )
  }

  updateProfile(userUpdate: UserUpdate): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/update}`, userUpdate).pipe(
      tap(user => {this.currentUser.set(user)})
    )
  }


  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    this.router.navigate(['/logout']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getUserProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.currentUser.set(user))
    )
  }
}
