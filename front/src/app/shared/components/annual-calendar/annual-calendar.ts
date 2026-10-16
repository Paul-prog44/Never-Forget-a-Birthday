import { Component, Input, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FriendResponse } from '../../../core/models/friend.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-annual-calendar',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatTooltipModule],
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

  getBirthdaysForDate(date: Date): string {
    const month = date.getMonth();
    const day = date.getDate();

    const matches = this.birthdays().filter(b => {
      if (!b.date_of_birth) return false;
      const bDate = new Date(b.date_of_birth);
      return bDate.getMonth() === month && bDate.getDate() === day;
    });

    if (matches.length === 0) return '';
    return matches.map(m => `${m.firstname} ${m.lastname || ''}`).join(', ');
  }

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

  // Ajouter un attribut aria-label ou title aux cellules au survol via événement
onCalendarHover(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const cell = target.closest('.mat-calendar-body-cell') as HTMLElement;
  
  if (cell) {
    const ariaLabel = cell.getAttribute('aria-label');
    if (ariaLabel) {
      const cellDate = new Date(ariaLabel);
      const names = this.getBirthdaysForDate(cellDate);
      if (names) {
        cell.setAttribute('title', `🎂 Anniversaire : ${names}`);
      }
    }
  }
}
}
