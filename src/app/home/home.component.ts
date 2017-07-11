import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  allInterests: string[];
  userInterests: string[];

  role: string;

  constructor(
    private authService: AuthenticationService,
    private dbApi: DatabaseApiService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe(user => {
      if (user) {
        this.dbApi.getUserRole().take(1).subscribe(
          role => {
            this.role = role;

            this.dbApi.getCurrentUserInterests(this.authService.getUID(), role)
              .takeUntil(this.ngUnsubscribe).subscribe(userInterests => {
                this.userInterests = userInterests;
              });
          });
      }
    });

    this.dbApi.getAllInterests().takeUntil(this.ngUnsubscribe).subscribe(
      dbInterests => {
        this.allInterests = dbInterests;
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
