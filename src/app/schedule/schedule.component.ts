import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

import * as Vis from 'vis';

const MEETINGS_PATH = '/meetings';

const MINUTE_10 = 600000;


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  role: string;

  timeline: any;

  constructor(
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    private dbApi: DatabaseApiService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.dbApi.getUserRole().take(1).subscribe(
          role => {
            this.role = role

            // this.db.list(MEETINGS_PATH, {
            //   query: {
            //     orderByChild: 'completed',
            //     equalTo: false
            //   }
            // })
            this.db.list(MEETINGS_PATH).takeUntil(this.ngUnsubscribe).subscribe((meetingsFB: any[]) => {

              const tempRole = 'hotelier';

              const filteredMeetingsFB = this.filterMeetingsFB(tempRole, meetingsFB);

              // if (this.timeline) {
              //   this.updateTimelineData(tempRole);
              // }

              this.timeline = this.createTimeline(tempRole, filteredMeetingsFB);
            });

          });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  private filterMeetingsFB(role: string, meetingsFB: any[]) {
    if (role === 'chamber') {
      return meetingsFB; // return all meetings
    }

    const filteredMeetingsFB = [];

    if (role === 'hotelier') {
      meetingsFB.forEach(meetingFB => {
        if (meetingFB.hotelier.uid === this.authService.getUID()) {
          filteredMeetingsFB.push(meetingFB); // get all meetings in which the hotelier is the current user
        }
      });
    }

    if (role === 'producer') {
      meetingsFB.forEach(meetingFB => {
        // if (meetingFB.producer.uid === this.authService.getUID()) {
        if (meetingFB.producer.uid === 'SoLmAgNiYuWLBt9pb395PVrPon72') {
          filteredMeetingsFB.push(meetingFB); // get all meetings in which the producer is the current user
        }
      });
    }

    return filteredMeetingsFB;
  }

  private duplicateInHoteliersIdAndName(array: any[], value) {
    return array.some(arrVal => value.hotelier.uid === arrVal.uid);
  }

  private createGroups(role: string, meetingsFB?: any[]) {

    const hoteliersIdAndName = [];

    if (role === 'hotelier') {
      const hotelier = {
        uid: this.authService.getUID(),
        name: 'The Hotelier'
      };
      hoteliersIdAndName.push(hotelier);
    } else {
      meetingsFB.forEach(meetingFB => {
        if (!this.duplicateInHoteliersIdAndName(hoteliersIdAndName, meetingFB)) {
          const hotelier = {
            uid: meetingFB.hotelier.uid,
            name: meetingFB.hotelier.company
          };

          hoteliersIdAndName.push(hotelier);
        }
      });
    }

    const groups = new Vis.DataSet();

    hoteliersIdAndName.forEach(hotelier => {
      groups.add({ id: hotelier.uid, content: hotelier.name });
    });

    return groups;
  }

  private createEvents(role: string, meetingsFB?: any[]) {
    // for (let i = 0; i < itemCount; i++) {
    //   // const start = now.clone().add(Math.random() * 200, 'hours');
    //   const start = new Date(now + 600000 * i);
    //   const end = new Date(now + (600000 * i + 600000));
    //   // const group = Math.floor(Math.random() * 0);
    //   meetings.add({
    //     id: i,
    //     // group: group,
    //     content: 'item ' + i,
    //     // + ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
    //     start: start,
    //     end: end
    //   });
    // }

    const meetings = new Vis.DataSet();

    meetingsFB.forEach(meeting => {
      const timestampToInt = parseInt(meeting.timestamp, 10);

      const start = new Date(timestampToInt);
      const end = new Date(timestampToInt + 600000);
      const id = meeting.$key;
      const groupId = role === 'hotelier' ? this.authService.getUID() : meeting.hotelier.uid;

      meetings.add({
        id: id,
        group: groupId,
        content: 'item ' + id,
        // + ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
        start: start,
        end: end,
        title: 'item ' + id // tooltip
      });

    });

    // const myspan: HTMLSpanElement = document.createElement('span');
    // myspan.innerText = 'Producer 1';

    // meetings.on('add', function (event, properties, senderId) {
    //   console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    // });

    // meetings.on('remove', function (event, properties, senderId) {
    //   console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    // });

    return meetings;
  }

  private createTimelineOptions(role: string, meetingsFB?: any[]) {

    const options = {
      type: 'range',
      // timeAxis: {scale: 'minute', step: 10},
      // start: new Date(2017, 6, 20, 9, 0),
      min: new Date(2017, 6, 7, 9, 0),
      // end: new Date(2017, 6, 23, 21, 0),
      max: new Date(2017, 6, 26, 21, 0),
      // groupOrder: 'content',
      orientation: 'top',
      zoomMin: 6500000, // 7200000 => 2 hours
      editable: {
        add: true,         // add new items by double tapping
        // updateTime: true,  // drag items horizontally
        remove: true       // delete an item by tapping the delete button top right
      },
      snap: (date: any, scale: string, step: number) => {
        // always snap to full 10-minutes, independent of the scale
        return Math.round(date / MINUTE_10) * MINUTE_10;
      },
      onAdd: (item, callback) => {
        // item.content = prompt('Edit items text:', item.content);
        item.end.setTime(item.start.getTime() + 600000); // meeting is always 10 minutes

        if (item.content != null) {
          callback(item);
        } else {
          callback(null);
        }
      }
    };

    return options;
  }

  private updateTimelineData(role: string, meetingsFB?: any[]) {
  }

  private createTimeline(role: string, meetingsFB?: any[]) {
    const container = document.getElementById('visualization');

    const groups = this.createGroups(role, meetingsFB);
    console.log('groups: ', groups.getIds());

    const meetings = this.createEvents(role, meetingsFB);
    console.log('meetings: ', meetings);

    const options = this.createTimelineOptions(role, meetingsFB);

    const timeline = new Vis.Timeline(container, meetings, groups, options);

    return timeline;
  }

}
