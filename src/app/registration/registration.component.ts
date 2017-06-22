import { Component, OnInit, AfterContentInit } from '@angular/core';

import { RegistrationDetails } from './model/RegistrationDetails';

declare var $: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterContentInit {

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

  ngAfterContentInit() {
    this.setupUI();

  }

  selectRole(role) {
    console.log(this.model.role);
  }

  private setupUI() {
    $('.ui.radio.checkbox').checkbox();
    $('.ui.dropdown').dropdown();
  }

}
