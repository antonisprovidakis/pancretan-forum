import { Component, OnInit } from '@angular/core';

import * as Vis from 'vis';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  timeline: any;

  constructor() { }

  ngOnInit() {
    this.timeline = this.createTimeline();
  }

  private createData() {

  }

  private createTimeline() {
    const container = document.getElementById('visualization');

    // const now = Vis.moment().minutes(0).seconds(0).milliseconds(0);
    const now = 1500620400000;
    const groupCount = 3;
    const itemCount = 20;

    const names = ['Hotelier 1', 'Hotelier 2', 'Hotelier 3'];
    const groups = new Vis.DataSet();
    for (let g = 0; g < groupCount; g++) {
      groups.add({ id: g, content: names[g] });
    }

    // create a dataset with items
    const items = new Vis.DataSet();
    for (let i = 0; i < itemCount; i++) {
      // const start = now.clone().add(Math.random() * 200, 'hours');
      const start = new Date(now + 600000 * i);
      const end = new Date(now + (600000 * i + 600000));
      const group = Math.floor(Math.random() * groupCount);
      items.add({
        id: i,
        group: group,
        content: 'item ' + i,
        // + ' <span style="color:#97B0F8;">(' + names[group] + ')</span>',
        start: start,
        end: end
      });
    }

    // const myspan: HTMLSpanElement = document.createElement('span');
    // myspan.innerText = 'Producer 1';

    // Create a DataSet (allows two way data-binding)
    // const items = new Vis.DataSet([
    //   {
    //     id: 1, content: myspan,
    //     start: new Date(1500620400000), end: new Date(1500620400000 + 600000), group: 0
    //   }
    //   // { id: 2, content: 'item 2', start: '2013-04-17', group: 1, type: 'box' },
    //   // { id: 3, content: 'item 3', start: '2013-04-18', group: 1, type: 'box' },
    //   // { id: 4, content: 'item 4', start: '2013-04-19', group: 2, type: 'box' }
    // ]);

    // items.on('add', function (event, properties, senderId) {
    //   console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    // });

    // items.on('remove', function (event, properties, senderId) {
    //   console.log('event:', event, 'properties:', properties, 'senderId:', senderId);
    // });

    const options = {
      type: 'range',
      // timeAxis: {scale: 'minute', step: 10},
      // start: new Date(2017, 6, 20, 9, 0),
      min: new Date(2017, 6, 20, 9, 0),
      // end: new Date(2017, 6, 23, 21, 0),
      max: new Date(2017, 6, 23, 21, 0),
      // groupOrder: 'content',
      orientation: 'top',
      zoomMin: 5400000,
      editable: {
        add: true,         // add new items by double tapping
        // updateTime: true,  // drag items horizontally
        remove: true       // delete an item by tapping the delete button top right
      },
      snap: (date: any, scale: string, step: number) => {
        // always snap to full 10-minutes, independent of the scale
        const minute10 = 600000;
        return Math.round(date / minute10) * minute10;
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

    const timeline = new Vis.Timeline(container, items, groups, options);


    return timeline;
  }

}
