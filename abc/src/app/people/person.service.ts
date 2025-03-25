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
}
