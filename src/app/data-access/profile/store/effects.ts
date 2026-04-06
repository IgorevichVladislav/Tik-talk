import {inject, Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {ProfileService} from '../profile.service';
import {profileActions} from './actions';

@Injectable({providedIn: 'root'})

export class ProfileEffects {
  private readonly profileService = inject(ProfileService);
  private readonly actions$ = inject(Actions);

  getTestAccounts = createEffect(() => {
    return this.actions$
      .pipe(ofType(profileActions.getTestAccounts),
        switchMap(() => this.profileService.getTestAccounts()),
        map(testProfiles => profileActions.testAccountsLoaded({profiles: testProfiles}))
      )
  })

  getMe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getMe),
        switchMap(() => this.profileService.getMe()),
        map(me => profileActions.getMeLoaded({profile: me}))
      )
  })

  getAccount = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getAccount),
        switchMap(({accountId}) => this.profileService.getAccount(accountId)),
        map(account => profileActions.accountLoaded({account: account}))
      )
  })

  updateMe = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.updateMe),
        switchMap(({updateDto}) => this.profileService.updateMe(updateDto)),
        map(update => profileActions.updateMeSuccess({profile: update}))
      )
  })

  getSubscribers = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getSubscribers),
        switchMap(({subscribersFilter}) => this.profileService.getSubscribers(subscribersFilter)),
        map(subscribers => profileActions.subscribersLoaded({subscribers: subscribers.items}))
      )
  })
}
