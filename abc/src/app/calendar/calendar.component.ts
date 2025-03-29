import { Component, OnInit } from '@angular/core';

interface Event {
  title: string;
  description: string;
  date: Date;
}

interface Day {
  date: Date;
  events: Event[];
}

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Day[] = [];
  isEventFormVisible: boolean = false;
  selectedDay: Day | null = null;
  eventTitle: string = '';
  eventDescription: string = '';

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    );
    const startDate = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    this.calendarDays = [];

    // Empty days before the first day of the month
    for (let i = 0; i < startDate; i++) {
      this.calendarDays.push({ date: new Date(0), events: [] });
    }

    // Populate the calendar with the days of the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        i
      );
      this.calendarDays.push({ date: currentDate, events: [] });
    }
  }

  prevMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  showSchedule(day: Day): void {
    this.selectedDay = day; // Set the selected day to display its schedule
  }

  openEventForm(day: Day): void {
    this.selectedDay = day;
    this.eventTitle = '';
    this.eventDescription = '';
    this.isEventFormVisible = true;
  }

  closeEventForm(): void {
    this.isEventFormVisible = false;
    this.selectedDay = null;
  }

  saveEvent(): void {
    if (this.selectedDay) {
      const newEvent: Event = {
        title: this.eventTitle,
        description: this.eventDescription,
        date: this.selectedDay.date,
      };

      this.selectedDay.events.push(newEvent);
      this.closeEventForm();
    }
  }
}
