import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

interface RegistrationDetails {
  role: string;
  company: string;
  interests?: string[];
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
    public dbApi: DatabaseApiService,
    private router: Router
  ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
    this.authService.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe(authData => {
      if (authData) {

        this.registrationForm.controls['name'].setValue(this.authService.getDisplayName());
        this.registrationForm.controls['email'].setValue(this.authService.getEmail());

        this.dbApi.getAllInterests().takeUntil(this.ngUnsubscribe).subscribe(allInterests => this.allInterests = allInterests);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      company: new FormControl(),
      role: new FormControl(),
      interests: new FormControl()
    })
  }

  enterForum() {
    const formData: RegistrationDetails = this.registrationForm.value;
    this.saveRole(formData);
  }

  private saveRole(data: RegistrationDetails) {
    if (data.role) {
      this.dbApi.updateUserRole(this.authService.getUID(), data.role);
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

    this.dbApi.createHotelierProfile(repr_hotel, interests);
    console.log('save HotelierProfile');
  }

  private createProducerProfile(data: RegistrationDetails) {
    const prod_name = data.company;
    const interests = data.interests;

    this.dbApi.createProducerProfile(prod_name, interests);
    console.log('save ProducerProfile');
  }

}
