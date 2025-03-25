import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Person } from '../person.model';
import { PersonService } from '../person.service';

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
  People: Person[] = [];
  editMode: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {}

  onCancel() {}
}
