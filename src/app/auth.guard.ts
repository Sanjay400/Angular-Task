// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }


// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import {  Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';
// import { AuthService } from './auth.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard  {
//   constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

//   canActivate(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       const storedUser = localStorage.getItem('loggedInUser');
//       if (storedUser) {
//         return true;
//       }
//     }
//     this.router.navigate(['/login']);
    
//     return false;
//   }
// }



import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
