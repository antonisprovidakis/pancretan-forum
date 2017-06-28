import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AuthenticationService } from '../../shared/authentication.service';

import { InterestObject } from './interest-object.interface';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  /* interests must contain all possible values, with user interests preselected */
  // default values
  interests: Observable<InterestObject[]>;

  constructor(
    private authService: AuthenticationService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    //create the interests observable of InterestObject array
    this.interests = new Observable(observer => {
      //get all interests from the database
      this.db.list('/interests').subscribe(dbInterests => {
        const interestObjectArray = [];

        //getCurrentUser uid
        this.authService.getCurrentUser().subscribe(user => {

          //get current user role
          this.authService.roleObservable.subscribe(role => {
            //get curent user interests
            this.db.list('/' + role + 's/users/' + this.authService.getUID() + '/interests')
              .subscribe(userInterests => {

                for (let dbInterest of dbInterests) {

                  interestObjectArray.push({
                    name: dbInterest.$value,
                    value: dbInterest.$value,
                    checked: false
                  });
                }
                // for (let userInterest of userInterests) {
                // }

                observer.next(interestObjectArray);
                observer.complete();
              });
          });
        });
      });
    });

    this.interests.subscribe(interests => console.log('final Interests', interests));

  }

  // get selectedOptions() {
  //   return this.interests.filter(opt => opt.checked)
  //     .map(opt => opt.value)
  // }

  test() {
    // console.log(JSON.stringify(this.interests, null, 2));
    // console.log(this.selectedOptions);
  }


  /*
  --- Provide data for "interests" property like this:
  interests: InterestObject[] = [
    { name: 'potato', value: 'potato', checked: true },
    { name: 'tomato', value: 'tomato', checked: true }
  ]



  --- Access selected options like the example below: ---

    <app-interests [interests]="interests" #inter></app-interests>
    <div>
      <p>Currently selected: {{inter.selectedOptions | json}}</p>
    </div>
  */

}
