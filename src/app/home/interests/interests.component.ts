import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {MdSelectChange} from '@angular/material';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  @Input() allInterests: string[] = ['potato', 'tomato', 'beaf', 'pork', 'cheese'];
  @Input() interests: string[] = ['potato', 'tomato'];
  @Output() interestsChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  fireInterestsChangeEvent(changeEvent: MdSelectChange ) {
    this.interestsChange.emit(changeEvent.value);
  }

}
