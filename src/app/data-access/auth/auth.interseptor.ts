import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';

import {AuthService} from '@tt/data-access/auth/auth.service';

let isRefreshing: boolean = false;

export const authIntersector: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  if (isRefreshing) return refreshAndProceed(req, next, authService);

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProceed(req, next, authService);
      }
      return throwError(error);
    })
  )
}

const refreshAndProceed = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshToken()
      .pipe(
        switchMap(switchToken => {
        isRefreshing = false;
        return next(addToken(req, switchToken.access_token))
      }));
  }

  return next(addToken(req, authService.token!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
