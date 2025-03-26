import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from './person.model';
import { MOCKPEOPLE } from './MOCKPEOPLE';

@Injectable({
  providedIn: 'root',
})
export class PersonService implements OnInit {
  people: Person[] = MOCKPEOPLE;
  @Output() personSelectedEvent = new EventEmitter<Person>();
  @Output() personChangedEvent = new EventEmitter<Person[]>();
  personListChangedEvent = new Subject<Person[]>();

  ngOnInit(): void {}

  getPeople(): Person[] {
    return this.people.slice();
  }

  getPerson(id: string): Person | null {
    const person = this.people.find((person) => person.id === id);
    return person || null;
  }

  getHouseholdInfo(person: Person): Person[] | null {
    if (!person.household) {
      return null; // Return null immediately if no household
    }

    const householdInfo: Person[] = [];

    person.household.forEach((personItem) => {
      const foundPerson = this.getPerson(personItem.id);
      if (foundPerson) {
        householdInfo.push(foundPerson);
      }
    });

    return householdInfo.length > 0 ? householdInfo : null; // Return null if empty
  }

  addPerson(person: Person) {}

  updatePerson(originalPerson: Person, newPerson: Person) {}

  deletePerson(person: Person) {}
}
