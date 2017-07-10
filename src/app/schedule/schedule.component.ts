import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { MdSnackBar } from '@angular/material';


import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

import * as Vis from 'vis';

// const MEETINGS_PATH = '/meetings';

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
  meetings: Vis.DataSet;
  groups: Vis.DataSet;

  constructor(
    public authService: AuthenticationService,
    public db: AngularFireDatabase,
    private dbApi: DatabaseApiService,
    public snackBar: MdSnackBar,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.dbApi.getUserRole().take(1).subscribe(
          role => {
            this.role = role;
            // this.role = 'producer';

            this.dbApi.getHoteliers().takeUntil(this.ngUnsubscribe).subscribe(hoteliers => {

              this.dbApi.getAllMeetings().takeUntil(this.ngUnsubscribe).subscribe((meetingsFB: any[]) => {

                const filteredMeetingsFB = this.filterMeetingsFB(this.role, meetingsFB);

                if (this.timeline) {
                  this.updateTimelineData(this.role, hoteliers, filteredMeetingsFB);
                  return;
                }

                this.timeline = this.createTimeline(this.role, hoteliers, filteredMeetingsFB);
              });
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

    return filteredMeetingsFB;
  }

  private duplicateInHoteliersIdAndName(array: any[], value) {
    return array.some(arrVal => value.$key === arrVal.uid);
  }

  private createGroups(role: string, hoteliers: any[]) {

    if (role === 'hotelier') {
      return null;
    }

    const hoteliersIdAndName = [];

    hoteliers.forEach(hotelier => {
      if (!this.duplicateInHoteliersIdAndName(hoteliersIdAndName, hotelier)) {
        const h = {
          uid: hotelier.$key,
          name: hotelier.repr_hotel.name
        };

        hoteliersIdAndName.push(h);
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

      const meetingObj = {
        id: id,
        start: start,
        end: end,
        state: meeting.state // custom property
      };

      let label = '<b><span>' + meeting.producer.company_name + '</span></b><br>' +
        '<span>Common Interests: ' + meeting.common_interests + '</span>';

      if (meeting.emergent_themes) {
        label = label + '<br><span>Emergent Themes: ' + meeting.emergent_themes + '</span>';
      }

      if (role !== 'hotelier') {
        meetingObj['group'] = meeting.hotelier.uid;
      }

      if (meeting.state === 'completed') {
        meetingObj['className'] = 'completed'
        label = label + '<br><span>State: <span style="background-color: #13d834;">Completed</span></span>';
      } else if (meeting.state === 'pending') {
        meetingObj['className'] = 'pending'
        label = label + '<br><span>State: <span style="background-color: #e8ad0d;">Pending</span></span>';
      } else {
        meetingObj['className'] = 'interim'
        label = label + '<br><span>State: <span style="background-color: #176aef;">Interim</span></span>';
      }

      if (role === 'producer') {
        if (meeting.producer.uid !== this.authService.getUID()) {
          label = '<span>Occupied</span>';

          if (meeting.state === 'completed') {
            meetingObj['className'] = 'occupiedCompleted'
          } else if (meeting.state === 'pending') {
            meetingObj['className'] = 'occupiedPending'
          } else {
            meetingObj['className'] = 'occupiedOnterim'
          }

        } else {
          if (meeting.timestamp >= Date.now()) {
            meetingObj['editable'] = {
              remove: true
            };
          }
        }
      }

      meetingObj['content'] = meetingObj['title'] = label;

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

  private createOptions(role: string, meetingsFB?: any[]) {
    const minDate = new Date(2017, 6, 7, 9, 0);
    const maxDate = new Date(2017, 6, 26, 21, 0);


    const hiddenDateStart = new Date(minDate);
    hiddenDateStart.setHours(21);
    hiddenDateStart.setMinutes(0);

    const hiddenDateEnd = new Date(minDate);
    hiddenDateEnd.setHours(8);
    hiddenDateEnd.setMinutes(0);

    const options = {
      hiddenDates: [
        { start: hiddenDateStart, end: hiddenDateEnd, repeat: 'daily' } // daily weekly monthly yearly
      ],
      type: 'range',
      // timeAxis: {scale: 'minute', step: 10},
      // start: new Date(2017, 6, 20, 9, 0),
      min: minDate,
      // end: new Date(2017, 6, 23, 21, 0),
      max: maxDate,
      // groupOrder: 'content',
      orientation: 'top',
      zoomMin: 6500000, // 7200000 => 2 hours
      snap: (date: any, scale: string, step: number) => {
        // always snap to full 10-minutes, independent of the scale
        return Math.round(date / MINUTE_10) * MINUTE_10;
      },
      onAdd: (item, callback) => {
        this.onAddMeeting(item, callback);
      },
      onRemove: (item, callback) => {
        this.onRemoveMeeting(item, callback);
      },
      onUpdate: (item, callback) => {
        console.log(item);
        console.log(callback);
        // this.onAcceptMeeting(item, callback);
      }
    };

    if (role === 'producer') {
      options['editable'] = {
        add: true
      };
    }

    return options;
  }

  private findCommonInterests(hotelierInterests, producerInterests) {
    const ret = [];
    for (const i in hotelierInterests) {
      if (producerInterests.indexOf(hotelierInterests[i]) > -1) {
        ret.push(hotelierInterests[i]);
      }
    }
    return ret;
  }

  private canAddMeeting(newMeeting, meetings) {
    const meetingsWithSameStartDate: any[] = this.meetings.get({
      filter: function (itemToFind) {
        return (itemToFind.start.getTime() === newMeeting.start.getTime());
      }
    });

    return meetingsWithSameStartDate.length === 0;
  }

  private onRemoveMeeting(meeting, callback?) {
    console.log(meeting);
    const meetingId = meeting.id;
    this.dbApi.removeMeeting(meetingId);
  }

  private onAddMeeting(newMeeting, callback) {
    if (!this.canAddMeeting(newMeeting, this.meetings)) {
      callback(null);
      this.snackBar.open('Meeting timeslot is already occupied!', null, {
        duration: 5000
      });
      return;
    }

    this.dbApi.getHotelier(newMeeting.group).subscribe(hotelier => {
      const hotelierInterests = hotelier.interests;

      this.dbApi.getProducer(this.authService.getUID()).subscribe(producer => {
        const producerInterests = producer.interests;

        const meetingId = newMeeting.group + '_' + this.authService.getUID() + '_' + newMeeting.start.getTime();
        const commonInterests = this.findCommonInterests(hotelierInterests, producerInterests);
        const timestamp = newMeeting.start.getTime();

        const h = {
          company_name: hotelier.repr_hotel.name,
          logo: hotelier.repr_hotel.logo,
          name: hotelier.name,
          online: false,
          photoURL: hotelier.photoURL,
          typing: false,
          uid: hotelier.$key
        };

        const p = {
          company_name: producer.company.name,
          logo: producer.company.logo,
          name: producer.name,
          online: false,
          photoURL: producer.photoURL,
          typing: false,
          uid: producer.$key
        };

        const meetingData = {
          common_interests: commonInterests,
          state: 'interim',
          hotelier: h,
          producer: p,
          timestamp: timestamp
        }
        console.log('before');
        this.dbApi.createMeeting(meetingId, meetingData);
        console.log('after');
      });
    });
  }

  private updateTimelineData(role: string, hoteliers: any[], meetingsFB?: any[]) {

    this.groups = this.createGroups(role, hoteliers);
    this.meetings = this.createMeetings(role, meetingsFB);

    this.timeline.setData({
      groups: this.groups,
      items: this.meetings
    });

  }

  private createTimeline(role: string, hoteliers: any[], meetingsFB?: any[]) {
    const container = document.getElementById('visualization');

    // this.groups = this.createGroups(role, meetingsFB);
    this.groups = this.createGroups(role, hoteliers);
    // if (this.groups) {
    //   console.log('groups: ', this.groups.getIds());
    // }

    this.meetings = this.createMeetings(role, meetingsFB);
    // console.log('meetings: ', this.meetings.getIds());

    const options = this.createOptions(role, meetingsFB);

    const timeline = new Vis.Timeline(container, this.meetings, this.groups, options);

    // timeline.on('contextmenu', props => {
    //   // if interim state, show menu to accept/reject

    //   // console.log('Right click!');
    //   // console.log(props);
    //   // this.onRemoveMeeting(this.meetings.get(props.item));

    //   // console.log(this.meetings.get(props.item).state);
    //   props.event.preventDefault();
    // });
    return timeline;
  }

}
