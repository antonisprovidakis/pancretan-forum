import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { InterestObject } from './interest-object.interface';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  /* interests must contain all possible values, with user interests preselected */
  // default values
  @Input() interests: InterestObject[] = [
    { name: 'potato', value: 'potato', checked: true },
    { name: 'tomato', value: 'tomato', checked: true },
    { name: 'beaf', value: 'beaf', checked: false },
    { name: 'pork', value: 'pork', checked: true },
    { name: 'cheese', value: 'cheese', checked: true }
  ];

  constructor() { }

  ngOnInit() {
  }

  get selectedOptions() {
    return this.interests.filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  test() {
    // console.log(JSON.stringify(this.interests, null, 2));
    console.log(this.selectedOptions);
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
