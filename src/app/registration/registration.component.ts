import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthenticationService } from '../shared/authentication.service';

declare var $: any;

interface RegistrationDetails {
  name?: string;
  email?: string;
  role?: string;
  company?: string;
  interests?: Array<string>;
}

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

  public model: RegistrationDetails;

  // constructor(public authService: AuthenticationService, private router: Router) {
  // authService causes problems
  constructor(private router: Router) {

  }

  ngOnInit() {

    this.model = {
      name: 'antonis',
      email: 'ant@sdsd.com',
      role: 'hotelier',
      company: '',
      interests: [],
    };
  }

  enterForum() {
    console.log(this.model);
  }

}
