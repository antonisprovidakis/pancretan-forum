import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  profilePicStyles: {};
  role = null;

  constructor(public authService: AuthenticationService, public dbApi: DatabaseApiService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().takeUntil(this.ngUnsubscribe).subscribe((authData) => {
      if (authData) {
        this.profilePicStyles = {
          'background-image': `url(${this.authService.getPhotoURL()})`
        };
        this.dbApi.getUserRole().take(1).subscribe(role => this.role = role);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  signout() {
    this.authService.signout().then(
      () => {
        this.role = null;
        this.router.navigate(['/login'])
        console.log('signout');
      });
  }

}
