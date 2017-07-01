import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/authentication.service';
import { DatabaseApiService } from '../shared/database-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role = 'anonymous';

  constructor(public authService: AuthenticationService, public dbApi: DatabaseApiService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((authData) => {
      if(authData){
        this.dbApi.getUserRole().subscribe(role => this.role = role);
      }
    });
  }

  logout() {
    this.authService.logout().then(
      () => {
        this.role = 'anonymous';
        this.router.navigate(['/login'])
        console.log('logout');
      });
  }

}
