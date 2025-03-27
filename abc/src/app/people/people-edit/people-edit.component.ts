import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-people-edit',
  standalone: false,
  templateUrl: './people-edit.component.html',
  styleUrl: './people-edit.component.css',
})
export class PeopleEditComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  originalPerson!: Person;
  person!: Person;
  people: Person[] = [];
  subscription!: Subscription;
  editMode: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.personService.fetchPeople();
    this.personService.personChangedEvent.subscribe((arr: Person[]) => {
      this.people = arr;
    });
    this.subscription = this.personService.personListChangedEvent.subscribe(
      (people: Person[]) => {
        this.people = people;
      }
    );
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newPerson = new Person(
      value.id,
      value.name,
      value.age || 0,
      value.address,
      value.phone,
      value.email || '',
      value.notes || '',
      value.household || null
    );
    // If a person component is being edited, update the person
    if (this.editMode == true) {
    } else {
      this.personService.addPerson(newPerson);
      this.onCancel();
    }
  }

  onCancel() {
    this.slForm.reset();
    this.router.navigate(['/people']);
  }
}
