import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/take';

interface IUser {
  name: string;
  email: string;
  photoURL: string;
  role?: string;
}

@Injectable()
export class AuthenticationService {

  // currentUser: Observable<firebase.User> = null;
  userInfo: Observable<IUser>;

  loggedUser: IUser;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    // this.currentUser = afAuth.authState;
  }


  // public setUserInfo(userInfo: User) {
  //   this.userInfo = userInfo;
  // }

  // public getCurrentUser() {
  //   return this.currentUser;
  // }

  isRegistered(): Observable<boolean> {
    const observable = new Observable(observer => {
      this.userInfo.subscribe((user: IUser) => {
        observer.next(!!user.role);
        observer.complete();
      });
    });

    return observable;
  }

  loginWithGoogle() {
    this.userInfo = new Observable(observer => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        () => {
          this.afAuth.authState.subscribe((authData) => {
            // console.log(authData);
            this.db.object('/users/' + authData.uid).take(1).subscribe(
              userData => {
                // this.loggedUser = new User(userData.name, userData.email, userData.photoURL, userData.role);

                this.loggedUser = {
                  name: userData.name,
                  email: userData.email,
                  photoURL: userData.photoURL,
                  role: userData.role
                }
                observer.next(this.loggedUser);
                observer.complete();
              });
          });
        })
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
