import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ExhibitionTableComponent } from './exhibition-table/exhibition-table.component';
import { ExhibitionProductComponent } from './exhibition-product/exhibition-product.component';
import { PeopleComponent } from './people/people.component';
import { NegotiationsTableComponent } from './negotiations-table/negotiations-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ExhibitionTableComponent,
    ExhibitionProductComponent,
    PeopleComponent,
    NegotiationsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
