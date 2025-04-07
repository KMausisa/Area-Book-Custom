import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  people: Person[] = [];
  maxPersonId: number;
  @Output() personSelectedEvent = new EventEmitter<Person>();
  @Output() personChangedEvent = new EventEmitter<Person[]>();
  personListChangedEvent = new Subject<Person[]>();

  constructor(private http: HttpClient) {
    this.maxPersonId = this.getMaxId();
  }

  ngOnInit(): void {}

  getPeople() {
    return this.http.get<any>('http://localhost:3000/people');
  }

  fetchPeople() {
    this.getPeople().subscribe(
      (response: { message: string; data: Person[] }) => {
        this.people = response?.data;
        this.maxPersonId = this.getMaxId();
        this.people.sort((curr, next) => {
          if (curr.id < next.id) {
            return -1;
          } else if (curr.id > next.id) {
            return 1;
          } else {
            return 0;
          }
        });
        this.personListChangedEvent.next(this.people.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPerson(id: string): Person | null {
    const person = this.people.find((person) => person.id === id);
    return person || null;
  }

  getHouseholdInfo(person: Person): Person[] {
    // If household is not defined or empty, return an empty array
    if (!person.household || person.household.length === 0) {
      return [];
    }

    const householdInfo: Person[] = [];

    // Loop through each item in the household list
    person.household.forEach((personItem) => {
      const foundPerson = this.getPerson(personItem.id);

      // Only add the person if foundPerson is valid (not null or undefined)
      if (foundPerson) {
        householdInfo.push(foundPerson);
      }
    });

    // Return the household info if there are valid people; otherwise, return an empty array
    return householdInfo.length > 0 ? householdInfo : [];
  }

  addPerson(newPerson: Person) {
    if (!newPerson) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; person: Person }>(
        'http://localhost:3000/people',
        newPerson,
        {
          headers: headers,
        }
      )
      .subscribe((responseData) => {
        const savedPerson = responseData.person;
        this.people.push(savedPerson);
        this.personListChangedEvent.next(this.people.slice());
      });
  }

  updatePerson(originalPerson: Person, newPerson: Person) {
    const pos = this.people.findIndex((p) => p.id === originalPerson.id);

    if (pos < 0) {
      return;
    }

    newPerson.id = originalPerson.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/people/' + originalPerson.id, newPerson, {
        headers: headers,
      })
      .subscribe(() => {
        this.people[pos] = newPerson;
        this.personListChangedEvent.next(this.people.slice());
      });
  }

  deletePerson(person: Person) {
    const pos = this.people.findIndex((p) => p.id === person.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/people/' + person.id)
      .subscribe(() => {
        this.people.splice(pos, 1);
        this.personListChangedEvent.next(this.people.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
    this.people.forEach((person) => {
      let currentId = +person.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}
