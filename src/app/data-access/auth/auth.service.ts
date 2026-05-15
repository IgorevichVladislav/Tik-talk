import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import {Auth} from './auth.interface';
import {BASE_API_URL} from '@tt/tokens/base-api-url.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly baseApiUrl = inject(BASE_API_URL);

  token: string | null = null;
  refresh_token: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }

    return !!this.token;
  }

  loginForAccessToken(payload: { username: string, password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<Auth>(`${this.baseApiUrl}/auth/token`, fd)
      .pipe(
        tap(responseToken => {
          this.saveTokens(responseToken);
        })
      )
  }

  refreshToken() {
    return this.http.post<Auth>(`${this.baseApiUrl}/auth/refresh`, {refresh_token: this.refresh_token})
      .pipe(
        tap(responseToken => {
          this.saveTokens(responseToken);
        }),
        catchError(error => {
          this.logout()
          return throwError(error)
        })
      )
  }

  logout() {
    return this.http.post<{ message: string }>(`${this.baseApiUrl}/auth/logout`, null)
      .pipe(
        tap(() => this.router.navigate(['/login']))
      )
  }

  saveTokens(res: Auth) {
    this.token = res.access_token;
    this.refresh_token = res.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refresh_token', this.refresh_token);
  }
}
