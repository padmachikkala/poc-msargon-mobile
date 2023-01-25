import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { LoginSchema, Registration } from '../utils/interfaces';
import { HeadersService } from './headers.service';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private headers: HeadersService,
    private storage: StorageService,
    private utils: UtilsService,
    private router: Router
  ) {}

  login = (loginBody: LoginSchema) => {
    return this.http
      .post(baseUrl + '/loginUser', loginBody, {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          if (response?.jwtToken) {
            const token = response?.jwtToken;

            console.log(response.userDetails);

            if (token) {
              const jwtData = token.split('.')[1];
              const decodedJwtJsonData = window.atob(jwtData);
              const decodedJwtData = JSON.parse(decodedJwtJsonData);

              this.storage.store('Token', token);
              this.storage.store('currentUser', decodedJwtJsonData);
              this.storage.store(
                'userDetails',
                JSON.stringify(response.userDetails)
              );

              this.storage.get('Token');
              this.storage.get('currentUser');
              this.storage.get('userDetails');

              return decodedJwtData?.sub;
            }
          } else {
            if (response.status) {
              this.utils.toast(response.status);
              return;
            }
          }
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  };

  signUp = (registerBody: Registration) => {
    return this.http
      .post(baseUrl + '/register', registerBody, {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  };

  forgotPassword = (forgotBody: string) => {
    return this.http
      .post(baseUrl + '/resetPassword', forgotBody, {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  };

  verifyToken = (otp: string) => {
    return this.http
      .post(baseUrl + '/validatePasswordResetToken', otp)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  };

  resetPassword = (email: string, password: string) => {
    const resetBody = {
      username: email,
      password: password,
    };
    return this.http
      .post(baseUrl + '/changePassword', resetBody, {
        headers: this.headers.normalHeaders(),
      })
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      );
  };

  logout = () => {
    this.storage.delete('userDetails');
    this.storage.delete('currentUser');
    this.storage.delete('Token');
    this.router.navigateByUrl('/login');
  };
}
