import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './shared/authentication.service';
import { Router } from '@angular/router';


@Injectable()
export class AppGuard implements CanActivate {

   constructor( private authService: AuthenticationService, private router: Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
  }
}


// @Injectable()
// export class AppGuard implements CanActivate {

//   constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router
//   ) { }

//   canActivate(): boolean {
//     var userRole = this.authenticationService.getLoggedInRole();
//     if (userRole) {
//       this.router.navigate(['/' + userRole]);
//       return false;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
