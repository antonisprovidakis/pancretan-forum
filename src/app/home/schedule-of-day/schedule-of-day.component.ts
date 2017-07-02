import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-of-day',
  templateUrl: './schedule-of-day.component.html',
  styleUrls: ['./schedule-of-day.component.scss']
})
export class ScheduleOfDayComponent implements OnInit {

  meetings: any[] = [
    {
      meetingWith: 'Antonakis Farms',
      time: '09:00'
    },
    {
      meetingWith: 'User123 Farms',
      time: '09:10'
    },
    {
      meetingWith: 'User Farms',
      time: '09:30'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  attendMeeting() {
    // TODO: implement what attend button should do.
    console.log('attended');
  }

  displayAttendButton(meetingTime: string): boolean {
    const today = new Date();
    const mTime = new Date();

    let h, min;
    [h, min] = meetingTime.split(/[:.]/);

    mTime.setHours(parseInt(h, 10));
    mTime.setMinutes(parseInt(min, 10) + 2);
    return mTime.getTime() > today.getTime();
  }

}
