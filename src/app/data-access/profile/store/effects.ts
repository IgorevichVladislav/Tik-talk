import {inject, Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {ProfileService} from '../profile.service';
import {profileActions} from './actions';
import {profileFeature} from '@tt/data-access/profile';

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

  getAccounts = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getAccounts),
        switchMap(({accountsFilter}) => this.profileService.getAccounts(accountsFilter)),
        map(accounts => profileActions.accountsLoaded({accounts: accounts.items}))
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

  getSubscriptions = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(profileActions.getSubscriptions),
        switchMap(({subscriptionsFilter}) => this.profileService.getSubscriptions(subscriptionsFilter)),
        map(subscriptions => profileActions.subscriptionsLoaded({subscriptions: subscriptions.items}))
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
