import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshtoken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  tokenExpireTimeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(emailIn: string, passwordIn: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBSeHGHFvhrBuxSb5sbXRuYVH1qt0RhH4',
        {
          email: emailIn,
          password: passwordIn,
          refreshToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(emailIn: string, passwordIn: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBSeHGHFvhrBuxSb5sbXRuYVH1qt0RhH4',
        {
          email: emailIn,
          password: passwordIn,
          refreshToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    if (!localStorage.getItem('userData')) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expireDuration: number =
        loadedUser.tokenExp.getTime() - new Date().getTime();
      this.autoLogout(expireDuration);
      console.log(expireDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth-page']);
    localStorage.removeItem('userData');
    if (this.tokenExpireTimeout) {
      clearTimeout(this.tokenExpireTimeout);
    }
    this.tokenExpireTimeout = null;
  }

  autoLogout(expireMs: number) {
    console.log(expireMs);
    this.tokenExpireTimeout = setTimeout(() => {
      this.logout();
    }, expireMs);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    idtoken: string,
    expireIn: number
  ) {
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new User(email, userId, idtoken, expDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(3600 * 1000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'inavalid email or password!!';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
