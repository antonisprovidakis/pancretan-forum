import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NegotiationsTableComponent } from './negotiations-table/negotiations-table.component';
import { PeopleComponent } from './people/people.component';
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
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
