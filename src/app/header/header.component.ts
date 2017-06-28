import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  role = 'hotelier';

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then(
      () => {
        console.log('logout');
        this.router.navigate(['/login'])
      });
  }

}
