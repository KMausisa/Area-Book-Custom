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
  originalPerson!: Person | null;
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
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalPerson = this.personService.getPerson(id);
      if (!this.originalPerson) {
        return;
      }
      this.editMode = true;
      this.person = JSON.parse(JSON.stringify(this.originalPerson));
    });
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
      []
    );
    // If a person component is being edited, update the person
    if (this.editMode == true) {
      if (!this.originalPerson || !newPerson) {
        return;
      }
      this.personService.updatePerson(this.originalPerson, newPerson);
      this.onCancel();
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
