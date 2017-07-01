import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import 'rxjs/add/operator/take';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

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
    private dbApi: DatabaseApiService
  ) { }

  ngOnInit() {

    this.dbApi.getAllInterests().subscribe(
      dbInterests => {
        this.allInterests = dbInterests;
      }
    );

    this.authService.getCurrentUser().subscribe(
      user => {
        if (user) {
          this.dbApi.getUserRole().take(1).subscribe(
            role => {
              this.dbApi.getCurrentUserInterests(this.authService.getUID(), role)
                .subscribe(userInterests => {
                  this.userInterests = userInterests;
                });
            });
        }
      });
  }
}
