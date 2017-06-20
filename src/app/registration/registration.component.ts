import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name: String = 'Antonis Providakis';
  email: String = 'ant.providakis@gmail.com';

  selectedRole: any = 'Hotelier'; // or Producer

  constructor() { }

  ngOnInit() {
    this.setupUI();
  }

  selectRole(role) {
    this.selectedRole = role;
  }

  private setupUI() {
    $('.ui.radio.checkbox').checkbox();
    $('.ui.dropdown').dropdown();
  }

}
