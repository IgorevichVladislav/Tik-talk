import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from 'rxjs';

import {AuthService} from '@tt/data-access/auth/auth.service';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authIntersector: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  if (isRefreshing$.value) return refreshAndProceed(req, next, authService);

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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshToken()
      .pipe(
        switchMap(switchToken => {
          isRefreshing$.next(false);
          return next(addToken(req, switchToken.access_token))
            .pipe(
              tap(() => isRefreshing$.next(false)),
            )
        }));
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.token!));

  return isRefreshing$.pipe(
    filter(isRefreshing => !isRefreshing),
    switchMap(() => {
      return next(addToken(req, authService.token!));
    })
  )
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
