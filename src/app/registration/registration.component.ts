import { Component, OnInit } from '@angular/core';

import { RegistrationDetails } from './model/RegistrationDetails';

declare var $: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  interests: Array<string> = [
    'potato',
    'tomato',
    'beaf',
    'pork',
    'cheese'
  ];

  model: RegistrationDetails = {};

  constructor() { }

  ngOnInit() {
    this.model.role = 'Hotelier';
    this.model.name = 'Antonis Providakis';
    this.model.email = 'ant.providakis@gmail.com';
  }

}
