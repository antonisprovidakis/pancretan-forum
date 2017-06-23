import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';

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

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  loginGoogle() {
    // TODO: firebase auth
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (data) => {
        console.log(data);
        console.log('----');

        // TODO: add user to database or
        // add user observable to a service in order to save data ONCE in registration screen
        this.user.subscribe((userData) => console.log(userData))
      }
    );
  }

}
