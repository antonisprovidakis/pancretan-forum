import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Subject } from 'rxjs/Subject';

import { AuthenticationService } from '../../shared/authentication.service';
import { DatabaseApiService } from '../../shared/database-api.service';

import { NegotiationsTableComponent } from '../../negotiations-table/negotiations-table.component';

const MEETINGS_PATH = '/meetings';

@Component({
  selector: 'app-schedule-of-day',
  templateUrl: './schedule-of-day.component.html',
  styleUrls: ['./schedule-of-day.component.scss']
})
export class ScheduleOfDayComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  meetings: any;
  role: string;

  private dialogConfig = {
    disableClose: true,
    // panelClass: 'custom-overlay-pane-class',
    panelClass: '',
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      meetingID: '',
      role: ''
    }
  };

  constructor(
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    private dbApi: DatabaseApiService,
    public afAuth: AngularFireAuth,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(authData => {
      if (authData) {
        this.dbApi.getUserRole().take(1).subscribe(role => {

          if (role) {
            this.role = role;

            this.db.list(MEETINGS_PATH, {
              query: {
                orderByChild: 'completed',
                equalTo: false
              }
            }).takeUntil(this.ngUnsubscribe).subscribe((meetings: any[]) => {
              const meetingsToDisplay = [];
              const now = Date.now();

              meetings.forEach(meeting => {
                // 86400000 ms = 1 day
                // if (m.timestamp <= now + 86400000 && m[role].uid === this.authService.getUID()) {

                // if (m[role].uid === this.authService.getUID() && m[role].deal === undefined) {
                // if (meeting[role].uid === this.authService.getUID() && meeting.deal === undefined) {
                if (meeting[role].uid === this.authService.getUID()) {
                  meetingsToDisplay.push(meeting);
                }
              });

              // ascending order sorting
              meetingsToDisplay.sort((a, b) => {
                return a.timestamp - b.timestamp;
              });

              this.meetings = meetingsToDisplay;
            });
          }
        });
      }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      // TODO: transfer exited chatroom, from pending to completed
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  attendMeeting(meetingId) {
    this.dialogConfig.data = {
      meetingID: meetingId,
      role: this.role
    }

    this.dialog.open(NegotiationsTableComponent, this.dialogConfig);
  }

  displayAttendButton(meetingTime: number): boolean {
    const now = Date.now();
    // 120000 ms = 2 minutes
    // 480000 ms = 8 minutes
    // return meetingTime - 120000 <= now && now <= meetingTime + 480000 ? true : false;
    return true;
  }

  private otherRole(role: string) {
    return role === 'hotelier' ? 'producer' : 'hotelier';
  }

  displayOther(meeting) {
    return meeting[this.otherRole(this.role)].name;
  }

}
