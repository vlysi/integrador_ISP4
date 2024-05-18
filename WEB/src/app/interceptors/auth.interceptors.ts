import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { StoreService } from '../auth/store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storeService: StoreService, private authService: AuthService) {
    console.log('AuthInterceptor constructor called');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', req.url);

    const loginUrl = `${environment.apiUrl}/account/login/`;
    const registerUrl = `${environment.apiUrl}/account/register/`;
    const refreshUrl = `${environment.apiUrl}/account/refresh/`;
    const contactUrl = `${environment.apiUrl}/contact/messages/`;
    const newsUrl = `${environment.apiUrl}/newsletter/`;

    if (req.url.includes(loginUrl) || req.url.includes(registerUrl) || req.url.includes(refreshUrl)) {
      console.log('Request to login, register, or refresh, not adding token');
      return next.handle(req);
    }
    if (req.url.includes(contactUrl)&& req.method === 'POST') {
            console.log('POST request to contact messages, not adding token');
        return next.handle(req);
    }
    if (req.url.includes(newsUrl)&& req.method === 'POST') {
      console.log('POST request to newsletter, not adding token');
      return next.handle(req);
    }

    if (!this.authService.checkTokenRefresh()) {
      console.log('Refresh token expired, logging out');
      this.authService.logOut();
      return throwError(() => new Error('Refresh token expired'));
    }
    let accessToken = this.storeService.getAccessToken();

    if (!this.authService.checkTokenAccess()) {
      console.log('Token expired, attempting to refresh token');
      return this.authService.refreshToken().pipe(
        switchMap((tokens: any) => {
          console.log('Token refresh successful', tokens.access);

          if (!tokens.access || !tokens.refresh) {
            console.log('Invalid token refresh response, logging out');
            this.authService.logOut();
            return throwError(() => new Error('Invalid token refresh response'));
          }

          this.storeService.setAccessToken(tokens.access);
          this.storeService.setRefreshToken(tokens.refresh);
          accessToken = this.storeService.getAccessToken();
          console.log("new access", accessToken);
          console.log("new refresh", tokens.refresh);
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          return next.handle(req);
        }),
        catchError((err) => {
          console.log('Error during token refresh:', err);
          this.authService.logOut();
          return throwError(err);
        })
      );
    }

    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('Access token added to headers');
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Unauthorized request');
        }
        return throwError(error);
      })
    );
  }
}
