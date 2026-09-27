import { Component, Input, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FriendResponse } from '../../../core/models/friend.model'; // Ajuste le chemin selon ton projet

@Component({
  selector: 'app-annual-calendar',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './annual-calendar.html',
  styleUrl: './annual-calendar.css',
})
export class AnnualCalendar {
  // Liste des anniversaires passée par le composant parent
  @Input() set birthdaysList(value: FriendResponse[]) {
    this.birthdays.set(value);
  }

  birthdays = signal<FriendResponse[]>([]);
  
  // Année affichée (par défaut l'année en cours)
  currentYear = signal<number>(new Date().getFullYear());

  // Génère un tableau [0, 1, ..., 11] représentant les 12 mois avec la bonne année
  months = computed(() => {
    const year = this.currentYear();
    return Array.from({ length: 12 }, (_, index) => new Date(year, index, 1));
  });

  // Fonction passée à [dateClass] de <mat-calendar>
  // Elle compare le JOUR et le MOIS (en ignorant l'année de naissance)
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const month = cellDate.getMonth();
      const date = cellDate.getDate();

      const hasBirthday = this.birthdays().some(b => {
        const bDate = new Date(b.date_of_birth);
        return bDate.getMonth() === month && bDate.getDate() === date;
      });

      return hasBirthday ? 'birthday-date' : '';
    }
    return '';
  };
}
