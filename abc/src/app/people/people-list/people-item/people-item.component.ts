import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Person } from '../../person.model';

@Component({
  selector: 'app-people-item',
  standalone: false,
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.css',
})
export class PeopleItemComponent implements OnInit {
  @Input() person!: Person;
  @Output() personSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.personSelected.emit();
  }
}
