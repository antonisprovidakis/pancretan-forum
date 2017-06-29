import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { InterestObject } from './interest-object.interface';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  /* interests must contain all possible values, with user interests preselected */
  // default values
  @Input() interests: string[] = ['potato', 'tomato'];
  @Output() interestsChange = new EventEmitter<string[]>();

  @Input() allInterests: string[] = ['potato', 'tomato', 'beaf', 'pork', 'cheese'];

  viewInterests: any[] = [];
  constructor() { }

  ngOnInit() {
    this.viewInterests = [];
    // return a sruct like this:
    // [
    //   { name: 'potato', value: 'potato', checked: true },
    //   { name: 'tomato', value: 'tomato', checked: true },
    //   { name: 'beaf', value: 'beaf', checked: false },
    //   { name: 'pork', value: 'pork', checked: true },
    //   { name: 'cheese', value: 'cheese', checked: true }
    // ]
    for (let interest of this.allInterests) {
      this.viewInterests.push({
        name: interest,
        value: interest,
        checked: false
      });
    }

    this.viewInterests.forEach(interest => {
      for (let userInterest of this.interests) {
        if (interest.name === userInterest) {
          interest.checked = true;
        }
      }
    });
  }

  toggleInterestFromArray(event) {
    this.updateViewInterests(event.source.value, event.checked);
    const newInterests = this.viewInterests.filter(opt => opt.checked)
      .map(opt => opt.value);
    // TODO: implement
    this.interestsChange.emit(newInterests);
  }

  get selectedOptions() {
    let viewInterests = [];
    // return a sruct like this:
    // [
    //   { name: 'potato', value: 'potato', checked: true },
    //   { name: 'tomato', value: 'tomato', checked: true },
    //   { name: 'beaf', value: 'beaf', checked: false },
    //   { name: 'pork', value: 'pork', checked: true },
    //   { name: 'cheese', value: 'cheese', checked: true }
    // ]
    for (let interest of this.allInterests) {
      viewInterests.push({
        name: interest,
        value: interest,
        checked: false
      });
    }

    viewInterests.forEach(interest => {
      for (let userInterest of this.interests) {
        if (interest.name === userInterest) {
          interest.checked = true;
        }
      }
    });

    return viewInterests;
  }

  updateViewInterests(changedInterest, checked){

    this.viewInterests.forEach(interest => {
      if(interest.value === changedInterest){
        interest.checked = checked;
      }

    })

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
