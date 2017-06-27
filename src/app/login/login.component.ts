import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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
  numOfHoteliers = 34;
  numOfProducers = 140;

  constructor(public authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginWithGoogle().then((d) => {
      console.log('in loginGoogle - LoginComponent: ', d);

      this.authService.roleObservable.take(1).subscribe(role => {
        console.log('from login - roleObs');

        if (role) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/register']);
        }
      });
    });
  }

  test() {

  }
}
