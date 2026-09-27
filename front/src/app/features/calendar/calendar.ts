import { Component, inject } from '@angular/core';
import { FriendService } from '../../core/services/friend.service';
import { AnnualCalendar } from '../../shared/components/annual-calendar/annual-calendar';


@Component({
  selector: 'app-calendar',
  imports: [AnnualCalendar],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private friendService = inject(FriendService)

  friendsList = this.friendService.friends

 
}
