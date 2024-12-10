import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'oauth-demo-ui';

  authService: OidcSecurityService = inject(OidcSecurityService);
  http = inject(HttpClient);

  authenticated = false;

  accessToken: string = '';
  decodedToken: string = '';

  responseTxt: string = '';
  errorTxt = '';


  ngOnInit(): void {
    console.log('ngOnInit');

    this.authService.checkAuth().subscribe(({isAuthenticated}) =>
      console.log('app authenticated 1', isAuthenticated)
    );

    // this.authService.isAuthenticated().subscribe(isit => console.log('isit', isit));

    this.authService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.authenticated = isAuthenticated;
      console.log('app authenticated 2', isAuthenticated);
      if (isAuthenticated) {
        this.authService.getAccessToken().subscribe(token => {
          this.accessToken = token;
          this.decodedToken = JSON.stringify(jwtDecode(token), null, 20);
        });
        this.authService.getRefreshToken().subscribe(token => console.log('refresh token', token));
      }
    });
  }

  login(): void {
    this.authService.authorize();
  }

  logout() {
    this.authService.logoff().subscribe(value => console.log('logout', value));
  }

  callService(url: string) {
    this.errorTxt = '';
    this.responseTxt = '';
    this.http.get<any[]>(
      'http://localhost:8080' + url,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
    ).subscribe({
      next: data => this.responseTxt = JSON.stringify(data),
      error: (error: HttpErrorResponse) => this.errorTxt = error.message,
    });
  }

}