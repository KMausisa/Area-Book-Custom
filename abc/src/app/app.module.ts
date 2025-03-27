import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

// People Components
import { PeopleComponent } from './people/people.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleItemComponent } from './people/people-list/people-item/people-item.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleFilterPipe } from './people/people-filter.pipe';
import { PersonService } from './people/person.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PeopleComponent,
    PeopleDetailComponent,
    PeopleEditComponent,
    PeopleItemComponent,
    PeopleListComponent,
    PeopleFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [PersonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
