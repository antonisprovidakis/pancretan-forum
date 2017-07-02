import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CapitalPipe } from './shared/pipes/capital.pipe';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdCardModule,
  MdToolbarModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdSliderModule,
  MdListModule,
  MdProgressSpinnerModule
} from '@angular/material';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PeopleComponent } from './people/people.component';
import { NegotiationsTableComponent } from './negotiations-table/negotiations-table.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InterestsComponent } from './home/interests/interests.component';
import { ScheduleOfDayComponent } from './home/schedule-of-day/schedule-of-day.component';
import { ExhibitionTableCardsComponent } from './home/exhibition-table-cards/exhibition-table-cards.component';
import { ExhibitionTableCardComponent } from './home/exhibition-table-cards/exhibition-table-card/exhibition-table-card.component';
import {
  ExhibitionProductComponent
} from './home/exhibition-table-cards/exhibition-product/exhibition-product.component';
import {
  ProductCommentsDialogComponent
} from './home/exhibition-table-cards/exhibition-product/product-comments-dialog/product-comments-dialog.component';
import { ExhibitionTableComponent } from './home/exhibition-table-cards/exhibition-table/exhibition-table.component';
import { LoggedComponent } from './logged/logged.component';

import { AuthenticationService } from './shared/authentication.service';
import { DatabaseApiService } from './shared/database-api.service';
import { AppGuard } from './app.guard';

@NgModule({
  declarations: [
    CapitalPipe,
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PeopleComponent,
    NegotiationsTableComponent,
    ScheduleComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    HomeComponent,
    InterestsComponent,
    ScheduleOfDayComponent,
    ExhibitionTableCardsComponent,
    ExhibitionTableCardComponent,
    ExhibitionProductComponent,
    ProductCommentsDialogComponent,
    ExhibitionTableComponent,
    LoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdCardModule,
    MdToolbarModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSliderModule,
    MdListModule,
    MdProgressSpinnerModule
  ],
  entryComponents: [ProductCommentsDialogComponent],
  providers: [
    AuthenticationService,
    AppGuard,
    DatabaseApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
