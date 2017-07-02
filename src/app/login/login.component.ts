import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

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

  constructor(
    public authService: AuthenticationService,
    public dbApi: DatabaseApiService,
    private router: Router,
    mdIconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer) {

    mdIconRegistry
      .addSvgIcon('google-plus', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/google-plus.svg'))
      .addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/facebook.svg'))
      .addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/twitter.svg'));
    // .addSvgIcon('minotaur', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo/minotaur.svg'));
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

    this.dbApi.getHoteliersCount().takeUntil(this.ngUnsubscribe)
      .subscribe(count => this.numOfHoteliers = count);

    this.dbApi.getProducersCount().takeUntil(this.ngUnsubscribe)
      .subscribe(count => this.numOfProducers = count);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  signinGoogle() {
    this.authService.signinWithGoogle();
  }

  signinFacebook() {
  }

  signinTwitter() {
  }
}
