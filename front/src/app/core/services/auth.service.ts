import { Injectable, inject, signal } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from "rxjs"
import { environment } from "../../../environments/environment"
import { Token } from "../models/token.model"
import {
    UserCreate,
    UserLogin,
    UserRegisterResponse,
    UserResponse
} from '../models/auth.model'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient)
    private apiUrl = `${environment.apiUrl}/auth`

    currentUser = signal<UserResponse |null>(null)

    login(credentials: UserLogin): Observable<Token>{
        return this.http.post<Token>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
            this.saveToken(response.access_token)
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


    logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
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
}
