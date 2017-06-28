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

  private user: Observable<firebase.User>;

  private authenticated = true;
  private displayName: string = null;
  private email: string = null;
  private uid: string = null
  // private role: string = null;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe((authData) => {
      if (authData) {
        this.authenticated = true;
        this.displayName = authData.displayName;
        this.email = authData.email;
        this.uid = authData.uid;
        // this.role = null;
        console.log('from service - login');
      } else {
        this.authenticated = false;
        this.displayName = null;
        this.email = null;
        this.uid = null;
        // this.role = null;
        console.log('from service - logout');
      }
    });
  }


  get roleObservable(): Observable<string> {
    return new Observable(observer => {
      if (this.authenticated) {
        this.db.object('/users/' + this.uid + '/role').take(1).subscribe(
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

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getCurrentUser(): Observable<firebase.User> {
    return this.authenticated ? this.user : null;
  }

  getUID(): string {
    return this.authenticated ? this.uid : '';
  }

  getEmail(): string {
    return this.authenticated ? this.email : '';
  }

  getDisplayName(): string {
    return this.authenticated ? this.displayName : '';
  }


  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
