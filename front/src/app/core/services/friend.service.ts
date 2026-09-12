import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FriendCreate, FriendResponse } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/friends` 

  // Signal pour maintenir la liste des amis synchronisée
  friends = signal<FriendResponse[]>([]);

  // Récupérer tous les amis
  getFriends(): Observable<FriendResponse[]> {
    return this.http.get<FriendResponse[]>(this.apiUrl).pipe(
      tap(friendsList => this.friends.set(friendsList))
    );
  }

  // Créer un ami
  createFriend(friendData: FriendCreate): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(this.apiUrl, friendData).pipe(
      tap(newFriend => {
        // Met à jour le signal en ajoutant le nouvel ami à la liste existante
        this.friends.update(current => [...current, newFriend]);
      })
    );
  }

  // Supprimer un ami
  deleteFriend(friendId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${friendId}`).pipe(
      tap(() => {
        // Retire l'ami supprimé du signal
        this.friends.update(current => current.filter(f => f.id !== friendId));
      })
    );
  }
}