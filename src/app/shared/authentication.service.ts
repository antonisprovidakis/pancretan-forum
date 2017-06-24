import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/take';

// interface IUser {
//   name: string;
//   email: string;
//   photoURL: string;
//   role?: string;
// }

@Injectable()
export class AuthenticationService {

  private user: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
  }

  get roleObservable(): Observable<string> {
    return new Observable(observer => {
      if (this.authenticated) {
        this.db.object('/users/' + this.currentUserId + '/role').take(1).subscribe(
          (roleData) => {
            const role = roleData.$value;

            if (role) {
              observer.next(role);
            } else {
              observer.next(null);
            }
            observer.complete();
          }
        );
      } else {
        observer.next(null);
        observer.complete();
      }
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): firebase.User {
    return this.authenticated ? this.user : null;
  }

  get currentUserObservable(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.user.uid : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.user.isAnonymous : false
  }

  get currentUserDisplayName(): string {
    if (!this.user) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.user.displayName || 'User without a Name'
    }
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (authData) => {
        this.user = authData.user;
      }
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
