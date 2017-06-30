import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import 'rxjs/add/operator/take';

import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allInterests: string[];
  userInterests: string[];
  constructor(
    private authService: AuthenticationService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {

    //get all interests from the db
    this.db.list('/interests').subscribe(
      dbInterests => {
        this.allInterests = dbInterests.map(interest => interest.$value);
      });

    this.authService.getCurrentUser().subscribe(
      user => {

        //get current user role
        this.authService.roleObservable.subscribe(
          role => {
            //get curent user interests
            this.db.list('/' + role + 's/users/' + this.authService.getUID() + '/interests')
              .subscribe(userInterests => {

                this.userInterests = userInterests
                  .map(userInterest => userInterest.$value);
              });
          });
      });
  }

}
