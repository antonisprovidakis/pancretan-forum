import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/images/profile_placeholder.png';

@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;
  private userInstance: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userInstance = user;
        console.log('from service - login');
      } else {
        this.userInstance = null;
        console.log('from service - logout');
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.userInstance;
  }

  getCurrentUser(): Observable<firebase.User> {
    // return this.authenticated ? this.user : null;
    return this.user;
  }

  getPhotoURL(): string {
    return this.userInstance ? this.userInstance.photoURL : PROFILE_PLACEHOLDER_IMAGE_URL;
  }

  getUID(): string {
    return this.userInstance ? this.userInstance.uid : '';
  }

  getEmail(): string {
    return this.userInstance ? this.userInstance.email : '';
  }

  getDisplayName(): string {
    return this.userInstance ? this.userInstance.displayName : '';
  }

  signinWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signinWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    return this.afAuth.auth.signOut();
  }

}
