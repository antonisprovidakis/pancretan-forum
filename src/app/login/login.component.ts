import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';

import 'rxjs/add/operator/take';

import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Pan-Cretan Forum';

  // dynamic values from firebase
  numOfHoteliers = 34;
  numOfProducers = 140;

  // constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginWithGoogle();
    this.authService.isRegistered().subscribe(isRegistered => {
      console.log(isRegistered);
    })
  }
}
