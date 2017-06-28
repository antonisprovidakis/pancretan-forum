import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validator} from "@angular/forms";
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
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  allInterests: string[] = [
    'potato',
    'tomato',
    'beaf',
    'pork',
    'cheese'
  ];
  registrationForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl({ value: 'Mamra', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      company: new FormControl(),
      role: new FormControl({ value: 'hotelier' }),
      interests: new FormControl()
    })
  }

  enterForum() {
    console.log('regitration form: ', this.registrationForm.value)
  }

}
