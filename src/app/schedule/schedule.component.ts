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
            // this.role = role;
            this.role = 'producer';

            // this.db.list(MEETINGS_PATH, {
            //   query: {
            //     orderByChild: 'completed',
            //     equalTo: false
            //   }
            // })
            this.db.list(MEETINGS_PATH).takeUntil(this.ngUnsubscribe)
              .subscribe((meetingsFB: any[]) => {

                const tempRole = this.role;

                const filteredMeetingsFB = this.filterMeetingsFB(tempRole, meetingsFB);

                // if (this.timeline) {
                //   this.updateTimelineData(tempRole, filteredMeetingsFB);
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
    if (role === 'chamber' || role === 'producer') {
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

    // if (role === 'producer') {
    //   meetingsFB.forEach(meetingFB => {
    //     // if (meetingFB.producer.uid === this.authService.getUID()) {
    //     if (meetingFB.producer.uid === 'SoLmAgNiYuWLBt9pb395PVrPon72') {
    //       filteredMeetingsFB.push(meetingFB); // get all meetings in which the producer is the current user
    //     }
    //   });
    // }

    return filteredMeetingsFB;
  }

  private duplicateInHoteliersIdAndName(array: any[], value) {
    return array.some(arrVal => value.hotelier.uid === arrVal.uid);
  }

  private createGroups(role: string, meetingsFB?: any[]) {

    if (role === 'hotelier') {
      return null;
    }

    const hoteliersIdAndName = [];

    meetingsFB.forEach(meetingFB => {
      if (!this.duplicateInHoteliersIdAndName(hoteliersIdAndName, meetingFB)) {
        const hotelier = {
          uid: meetingFB.hotelier.uid,
          name: meetingFB.hotelier.company
        };

        hoteliersIdAndName.push(hotelier);
      }
    });

    const groups = new Vis.DataSet();

    hoteliersIdAndName.forEach(hotelier => {
      groups.add({ id: hotelier.uid, content: hotelier.name });
    });

    return groups;
  }

  private createMeetings(role: string, meetingsFB?: any[]) {

    const meetings = new Vis.DataSet();

    meetingsFB.forEach(meeting => {
      const timestampToInt = parseInt(meeting.timestamp, 10);
      const start = new Date(timestampToInt);
      const end = new Date(timestampToInt + 600000);
      const id = meeting.$key;

      let label = '<b><span>' + meeting.producer.company + '</span></b><br>' +
        '<span>Common Interests: ' + meeting.common_interests + '</span>';

      if (meeting.emergent_themes) {
        label = label + '<br><span>Emergent Themes: ' + meeting.emergent_themes + '</span>';
      }

      const meetingObj = {
        id: id,
        // content: label,
        // + ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
        start: start,
        end: end,
        // title: label // tooltip
      };

      if (role !== 'hotelier') {
        meetingObj['group'] = meeting.hotelier.uid;
      }

      console.log(meeting.producer.uid);
      console.log(this.authService.getUID());


      if (role === 'producer') {

        if (meeting.producer.uid !== 'SoLmAgNiYuWLBt9pb395PVrPon72') {
          label = '<span>Occupied</span>';

          if (meeting.completed === true) {
            meetingObj['className'] = 'occupiedCompleted'
            label = label + '<br><span>State: <span style="background-color: #13d834;">Completed</span></span>';
          } else {
            meetingObj['className'] = 'occupiedPending'
            label = label + '<br><span>State: <span style="background-color: #e8ad0d;">Pending</span></span>';
          }
        } else {
          if (meeting.completed === true) {
            meetingObj['className'] = 'completed'
            label = label + '<br><span>State: <span style="background-color: #13d834;">Completed</span></span>';
          } else {
            meetingObj['className'] = 'pending'
            label = label + '<br><span>State: <span style="background-color: #e8ad0d;">Pending</span></span>';
          }

          const editable = {
            add: true,
            remove: true
          };

          meetingObj['editable'] = editable;
        }

        meetingObj['content'] = label;
        meetingObj['title'] = label;

      }

      meetings.add(meetingObj);
    });

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
      snap: (date: any, scale: string, step: number) => {
        // always snap to full 10-minutes, independent of the scale
        return Math.round(date / MINUTE_10) * MINUTE_10;
      },
      onAdd: (item, callback) => {
        // console.log(item.group); // find hotelier by group

        // item.content = prompt('Edit items text:', item.content);
        item.end.setTime(item.start.getTime() + 600000); // meeting is always 10 minutes

        if (item.content != null) {
          callback(item);
        } else {
          callback(null);
        }
      }
    };

    // if (role === 'producer') {
    //   const editable = {
    //     add: true,
    //     remove: true
    //   };

    //   options['editable'] = editable;
    // }

    return options;
  }

  private updateTimelineData(role: string, meetingsFB?: any[]) {

    const groups = this.createGroups(role, meetingsFB);
    const meetings = this.createMeetings(role, meetingsFB);

    this.timeline.setData({
      groups: groups,
      items: meetings
    });

  }

  private createTimeline(role: string, meetingsFB?: any[]) {
    const container = document.getElementById('visualization');

    const groups = this.createGroups(role, meetingsFB);
    // console.log('groups: ', groups.getIds());

    const meetings = this.createMeetings(role, meetingsFB);
    // console.log('meetings: ', meetings);

    const options = this.createTimelineOptions(role, meetingsFB);

    const timeline = new Vis.Timeline(container, meetings, groups, options);

    return timeline;
  }

}
