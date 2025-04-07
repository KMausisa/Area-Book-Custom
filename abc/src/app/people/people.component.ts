import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Component({
  selector: 'app-people',
  standalone: false,
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  selectedPerson!: Person;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.personSelectedEvent.subscribe((person) => {
      this.selectedPerson = person;
    });
  }
}
