import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Pan-Cretan Forum';

  // dynamic values from firebase
  numOfHoteliers = 0;
  numOfProducers = 0;

  constructor(public authService: AuthenticationService, private db: AngularFireDatabase, private router: Router) {

    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.authService.roleObservable.take(1).subscribe(role => {

          if (role) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/register']);
          }
        });
      }
    });

    db.object('/hoteliers/hoteliers_count').subscribe(data => this.numOfHoteliers = data.$value);
    db.object('/producers/producers_count').subscribe(data => this.numOfProducers = data.$value);
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
  }

  test() {
  }
}
