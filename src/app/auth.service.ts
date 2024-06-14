// // auth.service.ts
// import { isPlatformBrowser } from '@angular/common';
// import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000'; // Adjust the URL to your backend

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) { }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/users`, user);
//   }

//   login(email: string, password: string): Observable<boolean> {
//     return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`)
//       .pipe(
//         map(users => {
//           if (users.length) {
//             localStorage.setItem('currentUser', JSON.stringify(users[0]));
//             return true;
//           } else {
//             return false;
//           }
//         }),
//         catchError(() => of(false))
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//   }

//   getCurrentUser(): any {
//     return JSON.parse(localStorage.getItem('currentUser') || '{}');
//   }

//   isLoggedIn(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       return !!localStorage.getItem('currentUser');
//     }
//     return false;
//   }
  
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Adjust this according to your JSON server setup
  private isLoggedInStatus: boolean = false;
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.isLoggedInStatus = true;
          this.currentUser = users[0];
          return true;
        }
        return false;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  logout(): void {
    this.isLoggedInStatus = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

