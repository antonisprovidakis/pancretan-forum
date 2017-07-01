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
    
    // [
    //   { name: 'potato', value: 'potato', checked: true },
    //   { name: 'tomato', value: 'tomato', checked: true }
    // ]
    this.viewInterests = [];

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
          break;
        }
      }
    });
  }

  getCheckedInterests() {
    const newInterests = this.viewInterests.filter(opt => opt.checked)
      .map(opt => opt.value);
    this.interestsChange.emit(newInterests);
  }

}
