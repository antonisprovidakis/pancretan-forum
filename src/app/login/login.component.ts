import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/take';

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

  constructor(public authService: AuthenticationService, public dbApi: DatabaseApiService, private router: Router) {

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

  loginGoogle() {
    this.authService.loginWithGoogle();
  }
}
