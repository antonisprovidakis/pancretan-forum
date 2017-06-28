import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthenticationService } from '../shared/authentication.service';

interface RegistrationDetails {
  // name: string;
  // email: string;
  role: string;
  company: string;
  interests?: string[];
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  allInterests: FirebaseListObservable<string[]>;

  // allInterests: string[] = [
  //   'potato',
  //   'tomato',
  //   'beaf',
  //   'pork',
  //   'cheese'
  // ];

  registrationForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private db: AngularFireDatabase,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.allInterests = db.list('/interests');


    // TODO: problem when refreshing page. Although authService data is available
    // form group doesn't init with vaulus
    this.registrationForm = new FormGroup({
      name: new FormControl({ value: this.authService.getDisplayName(), disabled: true }),
      email: new FormControl({ value: this.authService.getEmail(), disabled: true }),
      company: new FormControl(),
      role: new FormControl(),
      interests: new FormControl()
    })
  }

  ngOnInit() {
  }

  enterForum() {
    // console.log('regitration form: ', this.registrationForm.value);

    // const n = this.authService.getDisplayName();
    // const e = this.authService.getEmail();
    // const u = this.authService.getUID();
    // const d = {
    //   n: n,
    //   e: e,
    //   u: u
    // };

    // console.log('authData: ', d);

    const formData: RegistrationDetails = this.registrationForm.value;
    this.saveRole(formData);
  }

  private saveRole(data: RegistrationDetails) {
    console.log('DATA: ', data);


    if (data.role) {
      this.db.object('/users/' + this.authService.getUID()).update({ role: data.role });
      console.log('save role');

      this.createRoleProfile(data);

      this.router.navigate(['/home']);
    } else {
      console.log('Profile creation failed: ', data);
    }
  }

  private createRoleProfile(data: RegistrationDetails) {
    if (data.role === 'hotelier') {
      this.createHotelierProfile(data);
    } else if (data.role === 'producer') {
      this.createProducerProfile(data);
    }
  }

  private createHotelierProfile(data: RegistrationDetails) {

    const repr_hotel = data.company;
    const interests = data.interests;

    this.db.object('/hoteliers/users/' + this.authService.getUID()).set({
      repr_hotel: repr_hotel,
      interests: interests
    });
    console.log('save HotelierProfile');

  }
  private createProducerProfile(data: RegistrationDetails) {
    const prod_name = data.company;
    const interests = data.interests;

    this.db.object('/producers/users/' + this.authService.getUID()).set({
      prod_name: prod_name,
      interests: interests
    });
    console.log('save ProducerProfile');

  }

}
