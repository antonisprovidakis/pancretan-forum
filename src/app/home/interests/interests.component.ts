import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {MdSelectChange} from '@angular/material';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  @Input() allInterests: string[];
  @Input() interests: string[];
  @Output() interestsChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  fireInterestsChangeEvent(changeEvent: MdSelectChange ) {
    this.interestsChange.emit(changeEvent.value);
  }

}
