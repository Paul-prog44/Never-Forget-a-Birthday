import { Component, computed, inject } from '@angular/core';
import { FriendService } from '../../core/services/friend.service';
import { AnnualCalendar } from '../../shared/components/annual-calendar/annual-calendar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-calendar',
  imports: [AnnualCalendar, DatePipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private friendService = inject(FriendService)

  friendsList = this.friendService.friends

  sortedFriendsList = computed(() => {
    const list = [...this.friendsList()]; // On crée une copie pour ne pas muter l'original

    return list.sort((a, b) => {
      if (!a.date_of_birth || !b.date_of_birth) return 0;

      const dateA = new Date(a.date_of_birth);
      const dateB = new Date(b.date_of_birth);

      // On compare d'abord le MOIS (0-11)
      if (dateA.getMonth() !== dateB.getMonth()) {
        return dateA.getMonth() - dateB.getMonth();
      }

      // Si c'est le même mois, on compare le JOUR du mois (1-31)
      return dateA.getDate() - dateB.getDate();
    });
  });
  ngOnInit(): void {
      this.friendService.getFriends().subscribe();
      console.log(this.sortedFriendsList())
    }
}
