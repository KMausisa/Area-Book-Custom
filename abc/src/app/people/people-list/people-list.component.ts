import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people-list',
  standalone: false,
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  subscription!: Subscription;
  term!: string;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.fetchPeople();
    this.personService.personChangedEvent.subscribe((arr: Person[]) => {
      console.log('arr:', arr);
      this.people = arr;
    });
    this.subscription = this.personService.personListChangedEvent.subscribe(
      (people: Person[]) => {
        this.people = people;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }
}
