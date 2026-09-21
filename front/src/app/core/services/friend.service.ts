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

  //Memoire locale de la liste d'ami
  friends = signal<FriendResponse[]>([]);

  getFriends(): Observable<FriendResponse[]> {
    return this.http.get<FriendResponse[]>(this.apiUrl).pipe(
      tap(friendsList => this.friends.set(friendsList))
    );
  }

  createFriend(friendData: FriendCreate): Observable<FriendResponse> {
    return this.http.post<FriendResponse>(this.apiUrl, friendData).pipe(
      tap(newFriend => {
        this.friends.update(current => [...current, newFriend]);
      })
    );
  }

  deleteFriend(friendId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${friendId}`).pipe(
      tap(() => {
        this.friends.update(current => current.filter(f => f.id !== friendId));
      })
    );
  }

  updateFriend(friendId: number, updatedData: FriendCreate): Observable<FriendResponse> {
  return this.http.patch<FriendResponse>(`${this.apiUrl}/${friendId}`, updatedData).pipe(
    tap((updatedFriend) => {
      this.friends.update(currentFriends =>
        currentFriends.map(friend =>
          friend.id === friendId ? updatedFriend : friend
        )
      );
    })
  );
}
}