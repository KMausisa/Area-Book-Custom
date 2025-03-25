import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PeopleComponent } from './people/people.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
    children: [
      { path: 'new', component: PeopleEditComponent },
      { path: ':id', component: PeopleDetailComponent },
      { path: ':id/edit', component: PeopleEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
