import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthenticationService } from '../shared/authentication.service';

declare var $: any;

interface RegistrationDetails {
  // name?: string;
  // email?: string;
  role?: string;
  company?: string;
  interests?: Array<string>;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {


  allInterests: string[] = [
    'potato',
    'tomato',
    'beaf',
    'pork',
    'cheese'
  ];

  public model: RegistrationDetails;

  constructor(private authService: AuthenticationService, private router: Router) {
  // constructor(private router: Router) {
    console.log('constructor');
  }

   ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.model = {
      // name: this.authService.getDisplayName(),
      // email: this.authService.getEmail(),
      role: 'hotelier',
      company: '',
      interests: [],
    };
  }

  enterForum() {
    console.log(this.model);
  }

}
