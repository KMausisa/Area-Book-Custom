import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people-detail',
  standalone: false,
  templateUrl: './people-detail.component.html',
  styleUrl: './people-detail.component.css',
})
export class PeopleDetailComponent implements OnInit {
  householdInfo!: Person[] | null;
  person!: Person | null;
  id!: string;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.person = this.personService.getPerson(this.id);
      if (this.person) {
        this.householdInfo = this.personService.getHouseholdInfo(this.person);
      }
    });
  }

  onDelete() {}
}
