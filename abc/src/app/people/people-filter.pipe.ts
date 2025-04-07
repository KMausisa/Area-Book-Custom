import { Pipe, PipeTransform } from '@angular/core';

import { Person } from './person.model';

@Pipe({
  name: 'peopleFilter',
  standalone: false,
})
export class PeopleFilterPipe implements PipeTransform {
  transform(people: Person[], term: string): any {
    if (!term || term.length === 0) {
      return people;
    }
    console.log(term);
    const filteredPeople = people.filter((person: Person) =>
      person.name.toLowerCase().includes(term.toLowerCase())
    );

    return filteredPeople.length > 0 ? filteredPeople : people;
  }
}
