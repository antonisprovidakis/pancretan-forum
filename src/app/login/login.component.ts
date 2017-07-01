import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/take';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
      // .addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/google.svg'))
      .addSvgIcon('google-plus', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/google-plus.svg'))
      .addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/facebook.svg'))
      .addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/social/twitter.svg'))
      .addSvgIcon('minotaur', sanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo/minotaur.svg'));
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((authData) => {
      if (authData) {
        this.dbApi.getUserRole().take(1).subscribe(role => {
          if (role) {
            this.router.navigate(['/home']); //TODO: maybe pass as router param
          } else {
            this.router.navigate(['/register']);
          }
        });
      }
    });

    this.dbApi.getHoteliersCount().subscribe(count => this.numOfHoteliers = count);
    this.dbApi.getProducersCount().subscribe(count => this.numOfProducers = count);
  }

  signinGoogle() {
    this.authService.signinWithGoogle();
  }

  signinFacebook() {
  }

  signinTwitter() {
  }
}
