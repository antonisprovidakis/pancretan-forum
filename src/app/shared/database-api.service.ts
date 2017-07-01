import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class DatabaseApiService {

  constructor(private authService: AuthenticationService, private db: AngularFireDatabase) { }

  getAllInterests(): Observable<string[]> {
    return this.db.list('/interests')
      .map(dbInterests => dbInterests.map(interest => interest.$value));
  }

  getCurrentUserInterests(uid: string, role: string): Observable<string[]> {
    return this.db.list('/' + role + 's/users/' + uid + '/interests')
      .map(userInterests => userInterests.map(interest => interest.$value));
  }

  getHoteliersCount(): Observable<number> {
    return this.db.object('/hoteliers/hoteliers_count')
      .map(data => data.$value);
  }

  getProducersCount(): Observable<number> {
    return this.db.object('/producers/producers_count')
      .map(data => data.$value);
  }

  // getChambersCount(): Observable<number>{
  //   return this.db.object('/chambers/chambers_count')
  //   .map(data => data.$value);
  // }

  getUserRole(): Observable<string> {
    return new Observable(observer => {
      if (this.authService.isAuthenticated()) { //TODO: maybe remove
        this.db.object('/users/' + this.authService.getUID() + '/role').take(1).subscribe(
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

  updateUserRole(uid: string, role: string) {
    this.db.object('/users/' + uid).update({ role: role });
  }

  createHotelierProfile(hotel: string, interests: string[]) {
    this.db.object('/hoteliers/users/' + this.authService.getUID()).set({
      repr_hotel: hotel,
      interests: interests
    });
  }

  createProducerProfile(producerName: string, interests: string[]) {
    this.db.object('/producers/users/' + this.authService.getUID()).set({
      prod_name: producerName,
      interests: interests
    });
  }

}
