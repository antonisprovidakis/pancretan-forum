import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ExhibitionTableComponent } from './home/exhibition-table-cards/exhibition-table/exhibition-table.component';
import { ForumStatusComponent } from './forum-status/forum-status.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NegotiationsTableComponent } from './negotiations-table/negotiations-table.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';

// const routes: Routes = [
//   {
//     path: '',
//     children: []
//   }
// ];

// const adminRoutes: Routes = [
//   {
//     path: 'admin',
//     canActivateChild: [CanActivateAdminGuard], // check app.guard for CanActivateAdminGuard
//     component: LoggedComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'users/:id', component: UsersComponent },
//       { path: 'settings', component: GlobalSettingsComponent }
//     ]
//   }
// ];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, canActivate: [CanLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forum', component: ForumStatusComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'negTable', component: NegotiationsTableComponent },
  { path: 'exhibition-table/:id', component: ExhibitionTableComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
