import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthenticationService } from './authentication.service';

const MEETINGS_PATH = '/meetings';

@Injectable()
export class DatabaseApiService {

  constructor(private authService: AuthenticationService, private db: AngularFireDatabase) { }

  getAllInterests(): Observable<string[]> {
    return this.db.list('/interests')
      .map(dbInterests => dbInterests.map(interest => interest.$value));
  }

  getCurrentUserInterests(uid: string, role: string): Observable<string[]> {
    return this.db.list('/users/' + uid + '/interests')
      .map(userInterests => userInterests.map(interest => interest.$value));
  }

  getHoteliers(): FirebaseListObservable<any> {
    return this.db.list('/users', {
      query: {
        orderByChild: 'role',
        equalTo: 'hotelier'
      }
    });
  }

  getHotelier(uid: string): Observable<any> {
    return new Observable(observer => {
      this.getHoteliers().take(1).subscribe(hoteliers => {

        hoteliers.forEach(hotelier => {
          if (hotelier.$key === uid) {
            observer.next(hotelier);
            observer.complete();
          }
        });

        observer.next(null);
        observer.complete();
      });
    });
  }

  getProducers(): FirebaseListObservable<any> {
    return this.db.list('/users', {
      query: {
        orderByChild: 'role',
        equalTo: 'producer'
      }
    });
  }

  getProducer(uid: string): Observable<any> {
    return new Observable(observer => {
      this.getProducers().take(1).subscribe(producers => {

        producers.forEach(producer => {
          if (producer.$key === uid) {
            observer.next(producer);
            observer.complete();
          }
        });

        observer.next(null);
        observer.complete();
      });
    });
  }

  getProducerCompany(uid: string): Observable<any> {
    return new Observable(observer => {
      this.getProducers().take(1).subscribe(producers => {

        producers.forEach(producer => {
          if (producer.$key === uid) {
            observer.next(producer.company);
            observer.complete();
          }
        });

        observer.next(null);
        observer.complete();
      });
    });
  }

  getUserRole(): Observable<string> {
    return new Observable(observer => {
      if (this.authService.isAuthenticated()) { // TODO: maybe remove
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
    return this.db.object('/users/' + uid).update({ role: role });
  }

  createHotelierProfile(company: any, interests: string[]) {
    return this.db.object('/users/' + this.authService.getUID()).update({
      company: company,
      interests: interests
    });
  }

  createProducerProfile(company: any, interests: string[]) {
    return this.db.object('/users/' + this.authService.getUID()).update({
      company: company,
      interests: interests
    });
  }

  updateMeetingState(meetingId: string, newState: 'pending' | 'completed' | 'interim') {
    this.db.object('/meetings/' + meetingId).update({ state: newState });
  }

  updateMeetingDeal(meetingId: string, deal: boolean) {
    this.db.object('/meetings/' + meetingId).update({ deal: deal });
  }

  createMeeting(meetingId: string, meetingData: any) {
    this.db.object('/meetings/' + meetingId).set(meetingData);
  }

  removeMeeting(meetingId: string) {
    this.db.object('/meetings/' + meetingId).remove()
  }

  getAllMeetings() {
    return this.db.list(MEETINGS_PATH);
  }

  getCompletedMeetings() {
    return this.db.list(MEETINGS_PATH, {
      query: {
        orderByChild: 'state',
        equalTo: 'completed'
      }
    });
  }

  getPendingMeetings() {
    return this.db.list(MEETINGS_PATH, {
      query: {
        orderByChild: 'state',
        equalTo: 'pending'
      }
    });
  }

  getInterimMeetings() {
    return this.db.list(MEETINGS_PATH, {
      query: {
        orderByChild: 'state',
        equalTo: 'interim'
      }
    });
  }

}
