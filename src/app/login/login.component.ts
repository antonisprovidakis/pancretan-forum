import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  title = 'Pan-Cretan Forum';

  numOfHoteliers = 0;
  numOfProducers = 0;

  signinForm: FormGroup;


  constructor(
    public authService: AuthenticationService,
    public dbApi: DatabaseApiService,
    private router: Router) {

    this.signinForm = this.createForm();
  }

  ngOnInit() {
    this.authService.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe((authData) => {
      if (authData) {
        this.dbApi.getUserRole().take(1).subscribe(role => {
          if (role) {
            this.router.navigate(['/home']); // TODO: maybe pass role as router param
          } else {
            this.router.navigate(['/register']);
          }
        });
      }
    });

    this.dbApi.getHoteliers().takeUntil(this.ngUnsubscribe)
      .subscribe(hoteliers => this.numOfHoteliers = hoteliers.length);

    this.dbApi.getProducers().takeUntil(this.ngUnsubscribe)
      .subscribe(producers => this.numOfProducers = producers.length);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  signin() {
    const loginFormData = this.signinForm.value;
    const email = loginFormData.email;
    const password = loginFormData.password;

    this.authService.signinWithEmail(email, password);
  }

  signinGoogle() {
    this.authService.signinWithGoogle();
  }

  signinFacebook() {
  }

  signinTwitter() {
  }
}
